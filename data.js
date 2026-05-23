// 50種類の食品データ
const FOOD_DATABASE = [
    // 野菜 (15種類)
    { name: 'トマト', category: '野菜', typicalLife: 7 },
    { name: 'キュウリ', category: '野菜', typicalLife: 5 },
    { name: 'レタス', category: '野菜', typicalLife: 7 },
    { name: 'ニンジン', category: '野菜', typicalLife: 14 },
    { name: 'ジャガイモ', category: '野菜', typicalLife: 30 },
    { name: 'タマネギ', category: '野菜', typicalLife: 30 },
    { name: 'ブロッコリー', category: '野菜', typicalLife: 5 },
    { name: 'キャベツ', category: '野菜', typicalLife: 14 },
    { name: 'ほうれん草', category: '野菜', typicalLife: 3 },
    { name: 'ナス', category: '野菜', typicalLife: 5 },
    { name: 'ピーマン', category: '野菜', typicalLife: 10 },
    { name: 'モヤシ', category: '野菜', typicalLife: 3 },
    { name: 'キノコ', category: '野菜', typicalLife: 5 },
    { name: 'トウモロコシ', category: '野菜', typicalLife: 3 },
    { name: 'ニンニク', category: '野菜', typicalLife: 30 },

    // 果物 (10種類)
    { name: 'バナナ', category: '果物', typicalLife: 7 },
    { name: 'リンゴ', category: '果物', typicalLife: 30 },
    { name: 'オレンジ', category: '果物', typicalLife: 14 },
    { name: 'ブドウ', category: '果物', typicalLife: 7 },
    { name: 'イチゴ', category: '果物', typicalLife: 3 },
    { name: 'スイカ', category: '果物', typicalLife: 7 },
    { name: 'メロン', category: '果物', typicalLife: 7 },
    { name: 'レモン', category: '果物', typicalLife: 21 },
    { name: 'キウイ', category: '果物', typicalLife: 7 },
    { name: 'マンゴー', category: '果物', typicalLife: 5 },

    // 肉 (8種類)
    { name: '鶏肉', category: '肉', typicalLife: 2 },
    { name: '牛肉', category: '肉', typicalLife: 3 },
    { name: '豚肉', category: '肉', typicalLife: 3 },
    { name: 'ハム', category: '肉', typicalLife: 10 },
    { name: 'ベーコン', category: '肉', typicalLife: 10 },
    { name: 'ソーセージ', category: '肉', typicalLife: 7 },
    { name: '鶏卵', category: '肉', typicalLife: 28 },
    { name: '挽き肉', category: '肉', typicalLife: 2 },

    // 魚 (5種類)
    { name: 'サーモン', category: '魚', typicalLife: 2 },
    { name: 'マグロ', category: '魚', typicalLife: 2 },
    { name: 'エビ', category: '魚', typicalLife: 2 },
    { name: 'イカ', category: '魚', typicalLife: 2 },
    { name: 'アジ', category: '魚', typicalLife: 1 },

    // 乳製品 (5種類)
    { name: '牛乳', category: '乳製品', typicalLife: 7 },
    { name: 'ヨーグルト', category: '乳製品', typicalLife: 14 },
    { name: 'チーズ', category: '乳製品', typicalLife: 30 },
    { name: 'バター', category: '乳製品', typicalLife: 60 },
    { name: 'クリーム', category: '乳製品', typicalLife: 10 },

    // 穀物 (7種類)
    { name: 'パン', category: '穀物', typicalLife: 5 },
    { name: 'ご飯', category: '穀物', typicalLife: 2 },
    { name: '麺', category: '穀物', typicalLife: 30 },
    { name: 'シリアル', category: '穀物', typicalLife: 90 },
    { name: '小麦粉', category: '穀物', typicalLife: 180 },
    { name: 'オートミール', category: '穀物', typicalLife: 120 },
    { name: 'パスタ', category: '穀物', typicalLife: 365 },

    // 調味料 (5種類)
    { name: 'しょう油', category: '調味料', typicalLife: 365 },
    { name: 'マヨネーズ', category: '調味料', typicalLife: 180 },
    { name: 'ケチャップ', category: '調味料', typicalLife: 180 },
    { name: '塩', category: '調味料', typicalLife: 3650 },
    { name: '砂糖', category: '調味料', typicalLife: 3650 }
];

// 50種類のレシピデータ
const RECIPE_DATABASE = [
    // 野菜系料理 (15種類)
    { name: 'サラダ', ingredients: ['トマト', 'キュウリ', 'レタス'], difficulty: 'easy' },
    { name: 'スープ', ingredients: ['タマネギ', 'ニンジン', 'ジャガイモ'], difficulty: 'easy' },
    { name: 'カレー', ingredients: ['タマネギ', 'ニンジン', 'ジャガイモ', '鶏肉'], difficulty: 'medium' },
    { name: 'シチュー', ingredients: ['ニンジン', 'ジャガイモ', '牛肉'], difficulty: 'medium' },
    { name: '野菜炒め', ingredients: ['キャベツ', 'ニンジン', 'トマト'], difficulty: 'easy' },
    { name: '和風パスタ', ingredients: ['パスタ', 'トマト', 'ニンニク'], difficulty: 'medium' },
    { name: 'オムレツ', ingredients: ['鶏卵', 'タマネギ', 'チーズ'], difficulty: 'easy' },
    { name: '麻婆豆腐', ingredients: ['豚肉', 'タマネギ', 'ニンニク'], difficulty: 'medium' },
    { name: 'キムチ鍋', ingredients: ['キャベツ', 'トマト', '豚肉'], difficulty: 'medium' },
    { name: 'ラタトゥイユ', ingredients: ['ナス', 'ピーマン', 'トマト'], difficulty: 'medium' },
    { name: 'ステーキ', ingredients: ['牛肉', 'ニンニク'], difficulty: 'easy' },
    { name: 'グラタン', ingredients: ['ジャガイモ', 'チーズ', 'クリーム'], difficulty: 'medium' },
    { name: 'ミートボール', ingredients: ['挽き肉', 'タマネギ', 'ニンニク'], difficulty: 'medium' },
    { name: 'フライドポテト', ingredients: ['ジャガイモ'], difficulty: 'easy' },
    { name: 'ベジタブルカレー', ingredients: ['ニンジン', 'ジャガイモ', 'タマネギ'], difficulty: 'easy' },

    // 肉系料理 (12種類)
    { name: 'チキンソテー', ingredients: ['鶏肉', 'ニンニク'], difficulty: 'easy' },
    { name: 'ハンバーグ', ingredients: ['挽き肉', 'タマネギ', 'ケチャップ'], difficulty: 'medium' },
    { name: 'から揚げ', ingredients: ['鶏肉', '塩'], difficulty: 'medium' },
    { name: 'ビーフステーキ', ingredients: ['牛肉', 'ニンニク'], difficulty: 'easy' },
    { name: 'ポークカツ', ingredients: ['豚肉'], difficulty: 'medium' },
    { name: 'ベーコンエッグ', ingredients: ['ベーコン', '鶏卵'], difficulty: 'easy' },
    { name: 'ウインナーソテー', ingredients: ['ソーセージ', 'タマネギ'], difficulty: 'easy' },
    { name: '照り焼きチキン', ingredients: ['鶏肉', 'しょう油', 'ニンニク'], difficulty: 'easy' },
    { name: 'ミートスパゲティ', ingredients: ['挽き肉', 'パスタ', 'トマト'], difficulty: 'medium' },
    { name: 'ステーキサンド', ingredients: ['牛肉', 'パン'], difficulty: 'easy' },
    { name: 'チキンカレー', ingredients: ['鶏肉', 'タマネギ', 'ニンジン'], difficulty: 'medium' },
    { name: '豚汁', ingredients: ['豚肉', 'ジャガイモ', 'ニンジン'], difficulty: 'easy' },

    // 魚・シーフード (8種類)
    { name: 'サーモングリル', ingredients: ['サーモン', 'レモン'], difficulty: 'easy' },
    { name: 'マグロ刺身', ingredients: ['マグロ'], difficulty: 'easy' },
    { name: 'エビ炒め', ingredients: ['エビ', 'ニンニク', 'タマネギ'], difficulty: 'medium' },
    { name: 'イカ焼き', ingredients: ['イカ', 'ニンニク'], difficulty: 'easy' },
    { name: 'アジのフライ', ingredients: ['アジ', '塩'], difficulty: 'medium' },
    { name: 'パエリア', ingredients: ['エビ', 'マグロ', 'パスタ'], difficulty: 'hard' },
    { name: 'シーフードカレー', ingredients: ['エビ', 'イカ', 'マグロ'], difficulty: 'medium' },
    { name: 'サーモン丼', ingredients: ['サーモン', 'ご飯'], difficulty: 'easy' },

    // 果物系 (5種類)
    { name: 'フルーツサラダ', ingredients: ['バナナ', 'リンゴ', 'イチゴ'], difficulty: 'easy' },
    { name: 'スムージー', ingredients: ['バナナ', 'イチゴ', 'ヨーグルト'], difficulty: 'easy' },
    { name: 'コンポート', ingredients: ['リンゴ', 'オレンジ'], difficulty: 'easy' },
    { name: 'フルーツケーキ', ingredients: ['イチゴ', 'バナナ', '小麦粉'], difficulty: 'hard' },
    { name: 'グレープジュース', ingredients: ['ブドウ'], difficulty: 'easy' },

    // その他 (10種類)
    { name: 'サンドウィッチ', ingredients: ['パン', 'ハム', 'チーズ'], difficulty: 'easy' },
    { name: 'ピザ', ingredients: ['パン', 'トマト', 'チーズ'], difficulty: 'medium' },
    { name: 'パスタアラビアータ', ingredients: ['パスタ', 'トマト', 'ニンニク'], difficulty: 'easy' },
    { name: 'ご飯弁当', ingredients: ['ご飯', '鶏肉', 'ニンジン'], difficulty: 'easy' },
    { name: 'オムライス', ingredients: ['ご飯', '鶏卵', 'トマト'], difficulty: 'medium' },
    { name: 'チャーハン', ingredients: ['ご飯', '挽き肉', 'トマト', 'ニンジン'], difficulty: 'easy' },
    { name: 'ラーメン', ingredients: ['麺', 'タマネギ', 'ニンニク'], difficulty: 'medium' },
    { name: 'うどん', ingredients: ['麺', 'ニンジン', 'タマネギ'], difficulty: 'easy' },
    { name: 'シリアルボウル', ingredients: ['シリアル', 'ヨーグルト', 'バナナ'], difficulty: 'easy' },
    { name: 'パンケーキ', ingredients: ['小麦粉', '鶏卵', 'バター'], difficulty: 'easy' }
];

// ユーティリティ関数
function getFoodName(food) {
    return food.name;
}

function getRecipeName(recipe) {
    return recipe.name;
}

function getDaysUntilExpiry(expiryDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiry = new Date(expiryDate);
    expiry.setHours(0, 0, 0, 0);
    const diff = expiry - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function formatDate(date) {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}年${month}月${day}日`;
}

function getExpiryStatus(daysUntilExpiry) {
    if (daysUntilExpiry < 0) {
        return 'expired';
    } else if (daysUntilExpiry <= 3) {
        return 'expiring-soon';
    } else {
        return 'fresh';
    }
}

function getExpiryMessage(daysUntilExpiry) {
    if (daysUntilExpiry < 0) {
        return `期限切れ (${Math.abs(daysUntilExpiry)}日前)`;
    } else if (daysUntilExpiry === 0) {
        return '本日が期限日です';
    } else if (daysUntilExpiry === 1) {
        return '明日が期限です ⚠️';
    } else if (daysUntilExpiry <= 3) {
        return `${daysUntilExpiry}日後に期限です ⚠️`;
    } else {
        return `${daysUntilExpiry}日後に期限`;
    }
}
