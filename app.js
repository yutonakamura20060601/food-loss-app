// ローカルストレージキー
const STORAGE_KEY = 'foodLossData';
const STORAGE_VERSION = '1.0';

// グローバル変数
let foodItems = [];
let currentFilter = 'all';

// DOM要素
const foodNameInput = document.getElementById('foodName');
const expiryDateInput = document.getElementById('expiryDate');
const quantityInput = document.getElementById('quantity');
const categorySelect = document.getElementById('category');
const addBtn = document.getElementById('addBtn');
const foodListDiv = document.getElementById('foodList');
const emptyMessage = document.getElementById('emptyMessage');
const filterButtons = document.querySelectorAll('.filter-btn');
const suggestRecipeBtn = document.getElementById('suggestRecipeBtn');
const recipeResult = document.getElementById('recipeResult');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const clearBtn = document.getElementById('clearBtn');
const foodListDatalist = document.getElementById('foodList');
const totalFoodSpan = document.getElementById('totalFood');
const expiringSoonSpan = document.getElementById('expiringSoon');
const expiredSpan = document.getElementById('expired');

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initializeFoodDatalist();
    renderFoodList();
    updateStats();
    setupEventListeners();
});

// イベントリスナー設定
function setupEventListeners() {
    addBtn.addEventListener('click', addFood);
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            renderFoodList();
        });
    });
    suggestRecipeBtn.addEventListener('click', suggestRecipes);
    exportBtn.addEventListener('click', exportData);
    importBtn.addEventListener('click', importData);
    clearBtn.addEventListener('click', clearAllData);
    
    // エンターキーで追加できるように
    expiryDateInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addFood();
    });
}

// 食品データリストの初期化
function initializeFoodDatalist() {
    foodListDatalist.innerHTML = '';
    FOOD_DATABASE.forEach(food => {
        const option = document.createElement('option');
        option.value = food.name;
        foodListDatalist.appendChild(option);
    });
}

// 食品を追加する
function addFood() {
    const name = foodNameInput.value.trim();
    const expiryDate = expiryDateInput.value;
    const quantity = quantityInput.value.trim();
    const category = categorySelect.value;

    // バリデーション
    if (!name) {
        showNotification('食品名を入力してください', 'error');
        return;
    }

    if (!expiryDate) {
        showNotification('賞味期限を入力してください', 'error');
        return;
    }

    // 同じ食品が既に登録されているかチェック
    const existingFood = foodItems.find(item => 
        item.name === name && item.expiryDate === expiryDate
    );

    if (existingFood) {
        showNotification('この食品は既に登録されています', 'error');
        return;
    }

    // 新しい食品を追加
    const newFood = {
        id: Date.now(),
        name: name,
        expiryDate: expiryDate,
        quantity: quantity || '1',
        category: category,
        addedDate: new Date().toISOString()
    };

    foodItems.push(newFood);
    saveData();
    renderFoodList();
    updateStats();
    
    // フォームをクリア
    clearForm();
    showNotification(`${name}を追加しました！`, 'success');
}

// 食品を削除する
function deleteFood(id) {
    const confirmDelete = confirm('この食品を削除しますか？');
    if (confirmDelete) {
        foodItems = foodItems.filter(item => item.id !== id);
        saveData();
        renderFoodList();
        updateStats();
        showNotification('食品を削除しました', 'success');
    }
}

// 食品リストをレンダリング
function renderFoodList() {
    foodListDiv.innerHTML = '';
    
    // フィルター処理
    let filteredItems = foodItems;
    if (currentFilter !== 'all') {
        filteredItems = foodItems.filter(item => item.category === currentFilter);
    }

    // 期限順でソート
    filteredItems.sort((a, b) => {
        const daysA = getDaysUntilExpiry(a.expiryDate);
        const daysB = getDaysUntilExpiry(b.expiryDate);
        return daysA - daysB;
    });

    if (filteredItems.length === 0) {
        emptyMessage.style.display = 'block';
        return;
    }

    emptyMessage.style.display = 'none';

    filteredItems.forEach(item => {
        const daysUntilExpiry = getDaysUntilExpiry(item.expiryDate);
        const status = getExpiryStatus(daysUntilExpiry);
        const expiryMessage = getExpiryMessage(daysUntilExpiry);

        const foodElement = document.createElement('div');
        foodElement.className = `food-item ${status}`;
        
        const dateClass = status === 'expired' ? 'danger' : (status === 'expiring-soon' ? 'warning' : '');

        foodElement.innerHTML = `
            <div class="food-info">
                <div class="food-name">${item.name}</div>
                <div class="food-details">
                    <span class="category-badge">${item.category}</span> • ${item.quantity}
                </div>
                <div class="food-date ${dateClass}">${formatDate(item.expiryDate)} (${expiryMessage})</div>
            </div>
            <div class="food-actions">
                <button class="btn-delete" onclick="deleteFood(${item.id})">削除</button>
            </div>
        `;

        foodListDiv.appendChild(foodElement);
    });
}

// レシピを提案する
function suggestRecipes() {
    if (foodItems.length === 0) {
        showNotification('食品を登録してからレシピを提案してください', 'error');
        return;
    }

    // 有効な食品（期限切れでない）を取得
    const validFoods = foodItems.filter(item => 
        getDaysUntilExpiry(item.expiryDate) >= 0
    );

    if (validFoods.length === 0) {
        recipeResult.innerHTML = '<div class="error-message">有効な食品がありません。期限切れのものが多いようです。</div>';
        return;
    }

    const validFoodNames = validFoods.map(item => item.name);
    const suggestedRecipes = RECIPE_DATABASE.filter(recipe => {
        // レシピのすべての材料がユーザーの食品に含まれているかチェック
        return recipe.ingredients.some(ingredient => 
            validFoodNames.includes(ingredient)
        );
    });

    // スコアに基づいてソート（材料が多いほどスコアが高い）
    suggestedRecipes.sort((a, b) => {
        const scoreA = a.ingredients.filter(ing => validFoodNames.includes(ing)).length;
        const scoreB = b.ingredients.filter(ing => validFoodNames.includes(ing)).length;
        return scoreB - scoreA;
    });

    if (suggestedRecipes.length === 0) {
        recipeResult.innerHTML = '<div class="error-message">今の食品ではレシピを提案できません。別の食品を追加してみてください。</div>';
        return;
    }

    // トップ10のレシピを表示
    const topRecipes = suggestedRecipes.slice(0, 10);
    
    recipeResult.innerHTML = '';
    
    topRecipes.forEach(recipe => {
        const availableIngredients = recipe.ingredients.filter(ing => 
            validFoodNames.includes(ing)
        );
        const missingIngredients = recipe.ingredients.filter(ing => 
            !validFoodNames.includes(ing)
        );

        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';

        let ingredientHTML = '';
        availableIngredients.forEach(ing => {
            ingredientHTML += `<span class="recipe-ingredient available">${ing} ✓</span>`;
        });
        missingIngredients.forEach(ing => {
            ingredientHTML += `<span class="recipe-ingredient">${ing}</span>`;
        });

        recipeCard.innerHTML = `
            <div class="recipe-name">🍽️ ${recipe.name}</div>
            <div class="recipe-ingredients">
                <strong>必要な材料:</strong><br>
                ${ingredientHTML}
            </div>
            <div style="margin-top: 10px; font-size: 0.9em; color: #666;">
                難易度: ${recipe.difficulty === 'easy' ? '簡単 ⭐' : recipe.difficulty === 'medium' ? '中程度 ⭐⭐' : '難しい ⭐⭐⭐'}
            </div>
        `;

        recipeResult.appendChild(recipeCard);
    });

    showNotification(`${topRecipes.length}個のレシピを提案しました！`, 'success');
}

// 統計情報を更新
function updateStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalFood = foodItems.length;
    const expiringSoon = foodItems.filter(item => {
        const days = getDaysUntilExpiry(item.expiryDate);
        return days >= 0 && days <= 3;
    }).length;
    const expired = foodItems.filter(item => 
        getDaysUntilExpiry(item.expiryDate) < 0
    ).length;

    totalFoodSpan.textContent = totalFood;
    expiringSoonSpan.textContent = expiringSoon;
    expiredSpan.textContent = expired;
}

// フォームをクリア
function clearForm() {
    foodNameInput.value = '';
    expiryDateInput.value = '';
    quantityInput.value = '';
    categorySelect.value = '野菜';
    foodNameInput.focus();
}

// データを保存
function saveData() {
    const data = {
        version: STORAGE_VERSION,
        items: foodItems,
        lastSaved: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// データを読み込む
function loadData() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        try {
            const parsed = JSON.parse(data);
            foodItems = parsed.items || [];
        } catch (e) {
            console.error('データの読み込みに失敗しました:', e);
            foodItems = [];
        }
    }
}

// データをエクスポート
function exportData() {
    const data = {
        version: STORAGE_VERSION,
        items: foodItems,
        exportDate: new Date().toISOString()
    };

    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `food-loss-backup-${new Date().getTime()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification('データをエクスポートしました', 'success');
}

// データをインポート
function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                
                // 既存のデータとマージするかどうか確認
                const merge = confirm('既存のデータとマージしますか？(キャンセルで置き換え)');
                
                if (merge) {
                    foodItems = [...foodItems, ...(data.items || [])];
                } else {
                    foodItems = data.items || [];
                }

                // 重複を削除
                const uniqueItems = [];
                const seenIds = new Set();
                foodItems.forEach(item => {
                    if (!seenIds.has(item.id)) {
                        seenIds.add(item.id);
                        uniqueItems.push(item);
                    }
                });
                foodItems = uniqueItems;

                saveData();
                renderFoodList();
                updateStats();
                showNotification('データをインポートしました', 'success');
            } catch (error) {
                showNotification('ファイルの読み込みに失敗しました', 'error');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

// すべてのデータをリセット
function clearAllData() {
    const confirmClear = confirm('本当にすべてのデータを削除しますか？この操作は取り消せません。');
    if (confirmClear) {
        const confirmAgain = confirm('本当に確認ですが、本当に削除しますか？');
        if (confirmAgain) {
            foodItems = [];
            recipeResult.innerHTML = '';
            localStorage.removeItem(STORAGE_KEY);
            renderFoodList();
            updateStats();
            showNotification('すべてのデータをリセットしました', 'success');
        }
    }
}

// 通知を表示
function showNotification(message, type = 'info') {
    // 既存の通知を削除
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}-message`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;

    if (type === 'success') {
        notification.style.backgroundColor = '#d4edda';
        notification.style.color = '#155724';
        notification.style.borderLeft = '4px solid #28a745';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#f8d7da';
        notification.style.color = '#721c24';
        notification.style.borderLeft = '4px solid #f5c6cb';
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// キーボードショートカット
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + S で保存
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        exportData();
    }
    
    // Ctrl/Cmd + N で新規追加フォーカス
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        foodNameInput.focus();
    }
});
