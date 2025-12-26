// Markdown图片生成器核心功能

// DOM元素
const markdownInput = document.getElementById('markdown-input');
const markdownPreview = document.getElementById('markdown-preview');
const themeSelect = document.getElementById('theme-select');
const layoutSelect = document.getElementById('layout-select');
const colorSchemeSelect = document.getElementById('color-scheme');
const customColors = document.getElementById('custom-colors');
const bgColorInput = document.getElementById('bg-color');
const primaryColorInput = document.getElementById('primary-color');
const accentColorInput = document.getElementById('accent-color');
const fontFamilySelect = document.getElementById('font-family');
const fontSizeSlider = document.getElementById('font-size');
const fontSizeValue = document.getElementById('font-size-value');
const signatureInput = document.getElementById('signature');
const signaturePositionSelect = document.getElementById('signature-position');
const renderBtn = document.getElementById('render-btn');
const exportPngBtn = document.getElementById('export-png');
const exportJpgBtn = document.getElementById('export-jpg');
const exportedImage = document.getElementById('exported-image');

// 装饰元素相关DOM元素
const elementTypeSelect = document.getElementById('element-type');
const elementColorInput = document.getElementById('element-color');
const elementSizeSlider = document.getElementById('element-size');
const elementSizeValue = document.getElementById('element-size-value');
const elementOpacitySlider = document.getElementById('element-opacity');
const elementOpacityValue = document.getElementById('element-opacity-value');
const elementXSlider = document.getElementById('element-x');
const elementXValue = document.getElementById('element-x-value');
const elementYSlider = document.getElementById('element-y');
const elementYValue = document.getElementById('element-y-value');
const elementWidthSlider = document.getElementById('element-width');
const elementWidthValue = document.getElementById('element-width-value');
const elementHeightSlider = document.getElementById('element-height');
const elementHeightValue = document.getElementById('element-height-value');
const addElementBtn = document.getElementById('add-element');
const clearElementsBtn = document.getElementById('clear-elements');

// 元素方案相关DOM元素
const schemeSelect = document.getElementById('scheme-select');
const schemePreview = document.getElementById('scheme-preview');
const customSchemeControls = document.getElementById('custom-scheme-controls');
const elementDensitySlider = document.getElementById('element-density');
const elementDensityValue = document.getElementById('element-density-value');
const schemeStyleSelect = document.getElementById('scheme-style');
const colorHarmonySelect = document.getElementById('color-harmony');
const generateSchemeBtn = document.getElementById('generate-scheme');
const saveSchemeBtn = document.getElementById('save-scheme');
const loadSchemeBtn = document.getElementById('load-scheme');

// 当前应用状态
let currentLayout = 'default';
let currentColorScheme = 'default';
let currentSignature = '';
let currentSignaturePosition = 'bottom-right';
let decorativeElements = [];
let currentElementScheme = 'none'; // 当前选中的元素方案
let decorativeElementCache = {}; // 装饰元素DOM缓存

// 内置元素方案库
const elementSchemes = {
    'none': {
        id: 'none',
        name: '无方案',
        description: '不添加任何装饰元素',
        elements: [],
        style: 'none',
        isBuiltIn: true
    },
    'tech-grid': {
        id: 'tech-grid',
        name: '科技网格',
        description: '基于网格的科技风格元素组合',
        elements: [
            { type: 'line', color: '#00ffff', size: 1, opacity: 0.3, x: 10, y: 10, width: 300, height: 1 },
            { type: 'line', color: '#00ffff', size: 1, opacity: 0.3, x: 10, y: 20, width: 300, height: 1 },
            { type: 'line', color: '#00ffff', size: 1, opacity: 0.3, x: 10, y: 30, width: 300, height: 1 },
            { type: 'line', color: '#00ffff', size: 1, opacity: 0.3, x: 10, y: 40, width: 300, height: 1 },
            { type: 'line', color: '#00ffff', size: 1, opacity: 0.3, x: 10, y: 50, width: 300, height: 1 },
            { type: 'line', color: '#00ffff', size: 1, opacity: 0.3, x: 10, y: 60, width: 300, height: 1 },
            { type: 'line', color: '#00ffff', size: 1, opacity: 0.3, x: 10, y: 70, width: 300, height: 1 },
            { type: 'line', color: '#00ffff', size: 1, opacity: 0.3, x: 10, y: 80, width: 300, height: 1 },
            { type: 'line', color: '#00ffff', size: 1, opacity: 0.3, x: 10, y: 90, width: 300, height: 1 },
            { type: 'line', color: '#00ffff', size: 1, opacity: 0.3, x: 10, y: 10, width: 1, height: 300 },
            { type: 'line', color: '#00ffff', size: 1, opacity: 0.3, x: 20, y: 10, width: 1, height: 300 },
            { type: 'line', color: '#00ffff', size: 1, opacity: 0.3, x: 30, y: 10, width: 1, height: 300 },
            { type: 'line', color: '#00ffff', size: 1, opacity: 0.3, x: 40, y: 10, width: 1, height: 300 },
            { type: 'line', color: '#00ffff', size: 1, opacity: 0.3, x: 50, y: 10, width: 1, height: 300 },
            { type: 'line', color: '#00ffff', size: 1, opacity: 0.3, x: 60, y: 10, width: 1, height: 300 },
            { type: 'line', color: '#00ffff', size: 1, opacity: 0.3, x: 70, y: 10, width: 1, height: 300 },
            { type: 'line', color: '#00ffff', size: 1, opacity: 0.3, x: 80, y: 10, width: 1, height: 300 },
            { type: 'line', color: '#00ffff', size: 1, opacity: 0.3, x: 90, y: 10, width: 1, height: 300 },
            { type: 'dot', color: '#00ffff', size: 5, opacity: 0.5, x: 15, y: 15, width: 5, height: 5 },
            { type: 'dot', color: '#00ffff', size: 5, opacity: 0.5, x: 25, y: 25, width: 5, height: 5 },
            { type: 'dot', color: '#00ffff', size: 5, opacity: 0.5, x: 35, y: 35, width: 5, height: 5 },
            { type: 'dot', color: '#00ffff', size: 5, opacity: 0.5, x: 45, y: 45, width: 5, height: 5 },
            { type: 'dot', color: '#00ffff', size: 5, opacity: 0.5, x: 55, y: 55, width: 5, height: 5 },
            { type: 'dot', color: '#00ffff', size: 5, opacity: 0.5, x: 65, y: 65, width: 5, height: 5 },
            { type: 'dot', color: '#00ffff', size: 5, opacity: 0.5, x: 75, y: 75, width: 5, height: 5 },
            { type: 'dot', color: '#00ffff', size: 5, opacity: 0.5, x: 85, y: 85, width: 5, height: 5 }
        ],
        style: 'tech',
        isBuiltIn: true
    },
    'neon-pattern': {
        id: 'neon-pattern',
        name: '霓虹图案',
        description: '霓虹风格的几何元素组合',
        elements: [
            { type: 'circle', color: '#ff00ff', size: 80, opacity: 0.2, x: 15, y: 15, width: 80, height: 80 },
            { type: 'circle', color: '#00ffff', size: 120, opacity: 0.2, x: 85, y: 25, width: 120, height: 120 },
            { type: 'circle', color: '#00ff00', size: 100, opacity: 0.2, x: 45, y: 65, width: 100, height: 100 },
            { type: 'dashed-line', color: '#ff00ff', size: 2, opacity: 0.6, x: 10, y: 10, width: 200, height: 2 },
            { type: 'dashed-line', color: '#00ffff', size: 2, opacity: 0.6, x: 10, y: 20, width: 220, height: 2 },
            { type: 'dashed-line', color: '#00ff00', size: 2, opacity: 0.6, x: 10, y: 30, width: 180, height: 2 }
        ],
        style: 'neon',
        isBuiltIn: true
    },
    'cyber-dots': {
        id: 'cyber-dots',
        name: '赛博点线',
        description: '赛博朋克风格的点线组合',
        elements: [
            { type: 'dot', color: '#ff00ff', size: 8, opacity: 0.8, x: 10, y: 10, width: 8, height: 8 },
            { type: 'dot', color: '#00ffff', size: 8, opacity: 0.8, x: 20, y: 20, width: 8, height: 8 },
            { type: 'dot', color: '#ff00ff', size: 8, opacity: 0.8, x: 30, y: 10, width: 8, height: 8 },
            { type: 'dot', color: '#00ffff', size: 8, opacity: 0.8, x: 40, y: 20, width: 8, height: 8 },
            { type: 'dot', color: '#ff00ff', size: 8, opacity: 0.8, x: 50, y: 10, width: 8, height: 8 },
            { type: 'dot', color: '#00ffff', size: 8, opacity: 0.8, x: 60, y: 20, width: 8, height: 8 },
            { type: 'dot', color: '#ff00ff', size: 8, opacity: 0.8, x: 70, y: 10, width: 8, height: 8 },
            { type: 'dot', color: '#00ffff', size: 8, opacity: 0.8, x: 80, y: 20, width: 8, height: 8 },
            { type: 'line', color: '#ff00ff', size: 2, opacity: 0.5, x: 10, y: 30, width: 150, height: 2 },
            { type: 'line', color: '#00ffff', size: 2, opacity: 0.5, x: 10, y: 40, width: 180, height: 2 },
            { type: 'line', color: '#ff00ff', size: 2, opacity: 0.5, x: 10, y: 50, width: 160, height: 2 },
            { type: 'line', color: '#00ffff', size: 2, opacity: 0.5, x: 10, y: 60, width: 190, height: 2 },
            { type: 'line', color: '#ff00ff', size: 2, opacity: 0.5, x: 10, y: 70, width: 170, height: 2 },
            { type: 'dot', color: '#ff00ff', size: 8, opacity: 0.8, x: 10, y: 80, width: 8, height: 8 },
            { type: 'dot', color: '#00ffff', size: 8, opacity: 0.8, x: 20, y: 90, width: 8, height: 8 },
            { type: 'dot', color: '#ff00ff', size: 8, opacity: 0.8, x: 30, y: 80, width: 8, height: 8 },
            { type: 'dot', color: '#00ffff', size: 8, opacity: 0.8, x: 40, y: 90, width: 8, height: 8 },
            { type: 'dot', color: '#ff00ff', size: 8, opacity: 0.8, x: 50, y: 80, width: 8, height: 8 },
            { type: 'dot', color: '#00ffff', size: 8, opacity: 0.8, x: 60, y: 90, width: 8, height: 8 }
        ],
        style: 'cyberpunk',
        isBuiltIn: true
    },
    'matrix-code': {
        id: 'matrix-code',
        name: '矩阵代码',
        description: '模仿矩阵电影的代码雨效果',
        elements: [
            { type: 'line', color: '#00ff00', size: 1, opacity: 0.6, x: 15, y: 10, width: 1, height: 200 },
            { type: 'line', color: '#00ff00', size: 1, opacity: 0.6, x: 30, y: 15, width: 1, height: 180 },
            { type: 'line', color: '#00ff00', size: 1, opacity: 0.6, x: 45, y: 12, width: 1, height: 220 },
            { type: 'line', color: '#00ff00', size: 1, opacity: 0.6, x: 60, y: 18, width: 1, height: 190 },
            { type: 'line', color: '#00ff00', size: 1, opacity: 0.6, x: 75, y: 14, width: 1, height: 210 },
            { type: 'line', color: '#00ff00', size: 1, opacity: 0.6, x: 90, y: 16, width: 1, height: 195 },
            { type: 'dot', color: '#00ff00', size: 6, opacity: 0.8, x: 15, y: 30, width: 6, height: 6 },
            { type: 'dot', color: '#00ff00', size: 6, opacity: 0.8, x: 30, y: 45, width: 6, height: 6 },
            { type: 'dot', color: '#00ff00', size: 6, opacity: 0.8, x: 45, y: 35, width: 6, height: 6 },
            { type: 'dot', color: '#00ff00', size: 6, opacity: 0.8, x: 60, y: 50, width: 6, height: 6 },
            { type: 'dot', color: '#00ff00', size: 6, opacity: 0.8, x: 75, y: 40, width: 6, height: 6 },
            { type: 'dot', color: '#00ff00', size: 6, opacity: 0.8, x: 90, y: 55, width: 6, height: 6 }
        ],
        style: 'matrix',
        isBuiltIn: true
    },
    'magazine-elegant': {
        id: 'magazine-elegant',
        name: '优雅杂志',
        description: '优雅的杂志风格装饰元素',
        elements: [
            { type: 'line', color: '#ffffff', size: 2, opacity: 0.4, x: 10, y: 10, width: 300, height: 2 },
            { type: 'line', color: '#ffffff', size: 2, opacity: 0.4, x: 10, y: 90, width: 300, height: 2 },
            { type: 'square', color: '#ffffff', size: 15, opacity: 0.3, x: 15, y: 15, width: 15, height: 15 },
            { type: 'square', color: '#ffffff', size: 15, opacity: 0.3, x: 85, y: 15, width: 15, height: 15 },
            { type: 'square', color: '#ffffff', size: 15, opacity: 0.3, x: 15, y: 85, width: 15, height: 15 },
            { type: 'square', color: '#ffffff', size: 15, opacity: 0.3, x: 85, y: 85, width: 15, height: 15 }
        ],
        style: 'magazine',
        isBuiltIn: true
    },
    'poster-dynamic': {
        id: 'poster-dynamic',
        name: '动态海报',
        description: '动态的海报风格元素组合',
        elements: [
            { type: 'triangle', color: '#ff0080', size: 40, opacity: 0.5, x: 15, y: 20, width: 40, height: 40 },
            { type: 'triangle', color: '#0080ff', size: 40, opacity: 0.5, x: 75, y: 20, width: 40, height: 40 },
            { type: 'circle', color: '#ff8000', size: 60, opacity: 0.4, x: 45, y: 55, width: 60, height: 60 },
            { type: 'curved-line', color: '#ff0080', size: 3, opacity: 0.7, x: 10, y: 10, width: 120, height: 3 },
            { type: 'curved-line', color: '#0080ff', size: 3, opacity: 0.7, x: 80, y: 10, width: 120, height: 3 }
        ],
        style: 'poster',
        isBuiltIn: true
    }
};

// 自定义用户方案存储
let userElementSchemes = {};

// 初始化应用
function initApp() {
    console.log('开始初始化应用...');
    
    // 检查所有DOM元素是否正确加载
    const elements = {
        markdownInput,
        markdownPreview,
        themeSelect,
        layoutSelect,
        colorSchemeSelect,
        customColors,
        bgColorInput,
        primaryColorInput,
        accentColorInput,
        fontFamilySelect,
        fontSizeSlider,
        fontSizeValue,
        signatureInput,
        signaturePositionSelect,
        renderBtn,
        exportPngBtn,
        exportJpgBtn,
        exportedImage,
        schemeSelect,
        schemePreview,
        customSchemeControls,
        elementDensitySlider,
        elementDensityValue,
        schemeStyleSelect,
        colorHarmonySelect,
        generateSchemeBtn,
        saveSchemeBtn,
        loadSchemeBtn
    };
    
    let allElementsLoaded = true;
    for (const [name, element] of Object.entries(elements)) {
        if (!element) {
            console.error(`DOM元素${name}未找到`);
            allElementsLoaded = false;
        }
    }
    
    if (!allElementsLoaded) {
        console.error('部分DOM元素未找到，初始化失败');
        return;
    }
    
    console.log('所有DOM元素加载完成');
    
    // 设置默认Markdown内容
    const defaultMarkdown = '# 科技前沿\n## AI的未来发展\n\n- 机器学习的突破\n- 深度学习的应用\n- 自然语言处理的进步\n- 计算机视觉的革新\n\n> 科技改变世界，AI引领未来\n\n### 核心技术\n\n- **机器学习**：让计算机从数据中学习\n- **深度学习**：模拟人脑神经网络\n- **强化学习**：通过奖惩机制优化决策\n\n```python\n# AI示例代码\nimport tensorflow as tf\nprint(\'Hello, AI World!\')\n```\n\n[了解更多AI知识](https://example.com)';
    
    
    markdownInput.value = defaultMarkdown;
    console.log('默认Markdown内容已设置');
    
    renderMarkdown();
    console.log('初始渲染完成');
    
    // 绑定事件监听器
    renderBtn.addEventListener('click', () => {
        console.log('渲染按钮被点击');
        renderMarkdown();
    });
    themeSelect.addEventListener('change', changeTheme);
    layoutSelect.addEventListener('change', changeLayout);
    colorSchemeSelect.addEventListener('change', changeColorScheme);
    bgColorInput.addEventListener('input', applyCustomColors);
    primaryColorInput.addEventListener('input', applyCustomColors);
    accentColorInput.addEventListener('input', applyCustomColors);
    fontFamilySelect.addEventListener('change', changeFontFamily);
    fontSizeSlider.addEventListener('input', changeFontSize);
    signatureInput.addEventListener('input', updateSignature);
    signaturePositionSelect.addEventListener('change', updateSignaturePosition);
    exportPngBtn.addEventListener('click', () => exportImage('png'));
    exportJpgBtn.addEventListener('click', () => exportImage('jpg'));
    
    // 装饰元素事件监听器
    elementSizeSlider.addEventListener('input', () => {
        elementSizeValue.textContent = `${elementSizeSlider.value}px`;
    });
    elementOpacitySlider.addEventListener('input', () => {
        elementOpacityValue.textContent = `${Math.round(elementOpacitySlider.value * 100)}%`;
    });
    elementXSlider.addEventListener('input', () => {
        elementXValue.textContent = `${elementXSlider.value}%`;
    });
    elementYSlider.addEventListener('input', () => {
        elementYValue.textContent = `${elementYSlider.value}%`;
    });
    elementWidthSlider.addEventListener('input', () => {
        elementWidthValue.textContent = `${elementWidthSlider.value}px`;
    });
    elementHeightSlider.addEventListener('input', () => {
        elementHeightValue.textContent = `${elementHeightSlider.value}px`;
    });
    addElementBtn.addEventListener('click', addDecorativeElement);
    clearElementsBtn.addEventListener('click', clearAllDecorativeElements);
    
    // 实时渲染
    markdownInput.addEventListener('input', (e) => {
        console.log('输入内容变化');
        renderMarkdown();
    });
    
    // 元素方案事件监听器
    schemeSelect.addEventListener('change', () => {
        const schemeId = schemeSelect.value;
        applyElementScheme(schemeId);
        updateSchemePreview(schemeId);
        
        // 显示/隐藏自定义方案控制面板
        if (schemeId === 'custom') {
            customSchemeControls.style.display = 'block';
        } else {
            customSchemeControls.style.display = 'none';
        }
    });
    
    // 元素密度滑块
    elementDensitySlider.addEventListener('input', () => {
        elementDensityValue.textContent = elementDensitySlider.value;
    });
    
    // 生成自定义方案
    generateSchemeBtn.addEventListener('click', generateCustomScheme);
    
    // 保存方案
    saveSchemeBtn.addEventListener('click', saveCurrentScheme);
    
    // 加载方案
    loadSchemeBtn.addEventListener('click', loadSavedScheme);
    
    // 初始化方案预览
    updateSchemePreview('none');
    
    // 从localStorage加载用户方案
    loadUserSchemesFromLocalStorage();
    
    console.log('应用初始化完成');
}

// 渲染Markdown内容
function renderMarkdown() {
    try {
        const markdownText = markdownInput.value;
        console.log('准备渲染的Markdown内容:', markdownText.substring(0, 100) + '...');
        
        // 确保marked库已加载
        if (typeof marked !== 'undefined') {
            console.log('marked库已加载，版本:', marked.version || '未知版本');
            
            // 使用不同的marked调用方式尝试
            let html;
            try {
                // 方式1: 使用marked.parse()
                html = marked.parse(markdownText);
                console.log('方式1成功渲染');
            } catch (e1) {
                console.log('方式1失败，尝试方式2:', e1.message);
                try {
                    // 方式2: 使用marked()函数直接调用
                    html = marked(markdownText);
                    console.log('方式2成功渲染');
                } catch (e2) {
                    console.log('方式2失败，尝试方式3:', e2.message);
                    // 方式3: 简单的HTML转换（作为后备）
                    html = simpleMarkdownToHtml(markdownText);
                    console.log('使用后备渲染方式');
                }
            }
            
            markdownPreview.innerHTML = html;
        console.log('渲染完成');
        updateSignatureDisplay(); // 渲染完成后重新显示署名
        } else {
            console.error('marked库未加载');
            // 尝试使用简单的HTML转换作为后备
            const html = simpleMarkdownToHtml(markdownText);
            markdownPreview.innerHTML = html;
            updateSignatureDisplay(); // 渲染完成后重新显示署名
        }
    } catch (error) {
        console.error('渲染Markdown出错:', error);
        markdownPreview.innerHTML = `<p style="color: #ff0000;">渲染错误: ${error.message}</p>`;
    }
}

// 简单的Markdown转换作为后备
function simpleMarkdownToHtml(text) {
    return text
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*)\*/g, '<em>$1</em>')
        .replace(/^- (.*$)/gm, '<ul><li>$1</li></ul>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^<ul>(.*?)<\/ul>/gs, '<ul>$1</ul>')
        .replace(/^<\/p>/, '')
        .replace(/<\/p>$/, '')
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
        .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>');
}

// 切换主题
function changeTheme() {
    const theme = themeSelect.value;
    
    // 移除所有主题类
    const themes = ['cyberpunk', 'neon', 'matrix', 'minimal-tech', 'magazine-modern', 'magazine-vintage', 'poster-bold', 'poster-artistic'];
    themes.forEach(t => markdownPreview.classList.remove(t));
    
    // 添加选中的主题类
    markdownPreview.classList.add(theme);
    
    // 更新布局和色彩方案
    changeLayout();
    updateSignatureDisplay();
}

// 切换布局
function changeLayout() {
    const layout = layoutSelect.value;
    
    // 移除所有布局类
    const layouts = ['default', 'poster-center', 'poster-left', 'poster-grid', 'magazine-spread'];
    layouts.forEach(l => markdownPreview.classList.remove(l));
    
    // 添加选中的布局类
    markdownPreview.classList.add(layout);
    currentLayout = layout;
    
    updateSignatureDisplay();
}

// 切换色彩方案
function changeColorScheme() {
    const scheme = colorSchemeSelect.value;
    
    // 移除所有色彩方案类
    const schemes = ['monochrome', 'complementary', 'analogous', 'triadic', 'custom-colors'];
    schemes.forEach(s => markdownPreview.classList.remove(s));
    
    // 根据选择显示/隐藏自定义颜色选项
    if (scheme === 'custom') {
        customColors.style.display = 'block';
        applyCustomColors();
    } else {
        customColors.style.display = 'none';
        
        if (scheme !== 'default') {
            markdownPreview.classList.add(scheme);
        }
    }
    
    currentColorScheme = scheme;
}

// 应用自定义颜色
function applyCustomColors() {
    const bgColor = bgColorInput.value;
    const primaryColor = primaryColorInput.value;
    const accentColor = accentColorInput.value;
    
    // 移除其他色彩方案类
    const schemes = ['monochrome', 'complementary', 'analogous', 'triadic'];
    schemes.forEach(s => markdownPreview.classList.remove(s));
    
    // 添加自定义颜色类
    markdownPreview.classList.add('custom-colors');
    
    // 应用自定义颜色
    markdownPreview.style.backgroundColor = bgColor;
    markdownPreview.style.color = primaryColor;
    
    // 设置标题和强调元素的颜色
    const headings = markdownPreview.querySelectorAll('h1, h2, h3');
    headings.forEach(heading => {
        heading.style.color = accentColor;
        heading.style.borderColor = accentColor;
    });
    
    const highlights = markdownPreview.querySelectorAll('strong, a, blockquote');
    highlights.forEach(element => {
        element.style.color = accentColor;
    });
}

// 更新署名
function updateSignature() {
    currentSignature = signatureInput.value;
    updateSignatureDisplay();
}

// 更新署名位置
function updateSignaturePosition() {
    currentSignaturePosition = signaturePositionSelect.value;
    updateSignatureDisplay();
}

// 更新署名显示
function updateSignatureDisplay() {
    // 移除现有的署名
    const existingSignature = markdownPreview.querySelector('.signature');
    if (existingSignature) {
        existingSignature.remove();
    }
    
    // 如果有署名内容，添加新的署名
    if (currentSignature) {
        const signatureElement = document.createElement('div');
        signatureElement.className = `signature ${currentSignaturePosition}`;
        signatureElement.textContent = currentSignature;
        markdownPreview.appendChild(signatureElement);
    }
}

// 改变字体
function changeFontFamily() {
    const fontFamily = fontFamilySelect.value;
    markdownPreview.style.fontFamily = fontFamily;
}

// 改变字体大小
function changeFontSize() {
    const fontSize = fontSizeSlider.value;
    fontSizeValue.textContent = `${fontSize}px`;
    markdownPreview.style.fontSize = `${fontSize}px`;
}

// 导出图片
async function exportImage(format = 'png') {
    try {
        // 显示导出提示
        exportedImage.innerHTML = '<p style="color: #00ffff;">正在生成图片...</p>';
        
        // 配置html2canvas选项
        const options = {
            backgroundColor: null,
            scale: 2, // 提高分辨率
            logging: false,
            useCORS: true,
            allowTaint: true
        };
        
        // 使用html2canvas生成canvas
        const canvas = await html2canvas(markdownPreview, options);
        
        // 转换为图片URL
        let imageUrl;
        if (format === 'png') {
            imageUrl = canvas.toDataURL('image/png');
        } else {
            imageUrl = canvas.toDataURL('image/jpeg', 0.9); // JPEG质量90%
        }
        
        // 显示导出的图片
        exportedImage.innerHTML = `
            <h3 style="color: #00ffff; margin-bottom: 15px;">导出成功！</h3>
            <img src="${imageUrl}" alt="导出的科技风格图片">
            <div style="margin-top: 15px;">
                <a href="${imageUrl}" download="tech-style-image.${format}" class="btn btn-primary" style="display: inline-block;">下载图片</a>
            </div>
        `;
        
    } catch (error) {
        console.error('导出图片失败:', error);
        exportedImage.innerHTML = '<p style="color: #ff0000;">导出失败，请重试！</p>';
    }
}

// 添加装饰元素
function addDecorativeElement() {
    const element = {
        id: `decor-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        type: elementTypeSelect.value,
        color: elementColorInput.value,
        size: parseInt(elementSizeSlider.value),
        opacity: parseFloat(elementOpacitySlider.value),
        x: parseInt(elementXSlider.value),
        y: parseInt(elementYSlider.value),
        width: parseInt(elementWidthSlider.value),
        height: parseInt(elementHeightSlider.value)
    };
    
    decorativeElements.push(element);
    renderDecorativeElements();
}

// 清除所有装饰元素
function clearAllDecorativeElements() {
    decorativeElements = [];
    // 移除所有装饰元素DOM
    const existingElements = markdownPreview.querySelectorAll('.decorative-element');
    existingElements.forEach(element => element.remove());
}

// 渲染装饰元素
function renderDecorativeElements() {
    // 使用DocumentFragment进行批处理渲染，减少DOM操作次数
    const fragment = document.createDocumentFragment();
    
    // 跟踪当前需要显示的元素ID
    const currentElementIds = new Set();
    
    // 渲染新的装饰元素
    decorativeElements.forEach(element => {
        // 为每个元素生成唯一ID
        const elementId = element.id || `decor-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        element.id = elementId; // 确保元素有唯一ID
        currentElementIds.add(elementId);
        
        let decorElement;
        
        // 尝试从缓存中获取元素
        if (decorativeElementCache[elementId]) {
            decorElement = decorativeElementCache[elementId];
        } else {
            // 创建新元素
            decorElement = document.createElement('div');
            decorElement.className = `decorative-element decorative-${element.type}`;
            decorElement.style.zIndex = '5'; // 确保装饰元素在主体内容下层
            decorElement.style.pointerEvents = 'none'; // 不干扰交互
            decorElement.style.position = 'absolute'; // 确保绝对定位
            
            // 存储到缓存
            decorativeElementCache[elementId] = decorElement;
        }
        
        // 更新元素样式
        updateDecorElementStyle(decorElement, element);
        
        // 添加到片段
        fragment.appendChild(decorElement);
    });
    
    // 移除所有现有的装饰元素
    const existingElements = markdownPreview.querySelectorAll('.decorative-element');
    existingElements.forEach(element => element.remove());
    
    // 将新元素添加到DOM
    markdownPreview.appendChild(fragment);
    
    // 清理缓存中不再使用的元素
    Object.keys(decorativeElementCache).forEach(id => {
        if (!currentElementIds.has(id)) {
            delete decorativeElementCache[id];
        }
    });
}

// 更新装饰元素样式
function updateDecorElementStyle(decorElement, element) {
    // 设置位置和透明度
    decorElement.style.left = `${element.x}%`;
    decorElement.style.top = `${element.y}%`;
    decorElement.style.opacity = element.opacity;
    
    // 根据元素类型设置不同的样式
    switch(element.type) {
        case 'line':
        case 'dashed-line':
        case 'curved-line':
            decorElement.style.width = `${element.width}px`;
            decorElement.style.height = `${element.size}px`;
            decorElement.style.backgroundColor = element.color;
            break;
        case 'circle':
            decorElement.style.width = `${element.size}px`;
            decorElement.style.height = `${element.size}px`;
            decorElement.style.backgroundColor = element.color;
            decorElement.style.borderRadius = '50%';
            break;
        case 'square':
            decorElement.style.width = `${element.size}px`;
            decorElement.style.height = `${element.size}px`;
            decorElement.style.backgroundColor = element.color;
            break;
        case 'triangle':
            // 三角形使用边框实现
            decorElement.style.width = '0';
            decorElement.style.height = '0';
            decorElement.style.borderLeft = `${element.size / 2}px solid transparent`;
            decorElement.style.borderRight = `${element.size / 2}px solid transparent`;
            decorElement.style.borderBottom = `${element.size}px solid ${element.color}`;
            break;
        case 'dot':
            decorElement.style.width = `${element.size / 3}px`;
            decorElement.style.height = `${element.size / 3}px`;
            decorElement.style.backgroundColor = element.color;
            decorElement.style.borderRadius = '50%';
            break;
    }
    
    // 添加特殊样式
    if (element.type === 'dashed-line') {
        decorElement.style.backgroundColor = 'transparent';
        decorElement.style.border = `${element.size}px dashed ${element.color}`;
        decorElement.style.height = '0';
    }
}

// 在渲染Markdown后重新渲染装饰元素
const originalRenderMarkdown = renderMarkdown;
renderMarkdown = function() {
    originalRenderMarkdown();
    renderDecorativeElements();
    updateSignatureDisplay();
};

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', initApp);

// 元素方案核心功能

// 应用元素方案
function applyElementScheme(schemeId) {
    // 清空当前装饰元素
    clearAllDecorativeElements();
    
    if (schemeId === 'none') {
        currentElementScheme = 'none';
        return;
    }
    
    // 获取方案（优先从用户方案中查找，然后从内置方案中查找）
    const scheme = userElementSchemes[schemeId] || elementSchemes[schemeId];
    
    if (!scheme) {
        console.error(`元素方案 ${schemeId} 未找到`);
        return;
    }
    
    currentElementScheme = schemeId;
    
    // 如果是自定义方案且未生成元素，则不应用
    if (schemeId === 'custom' && (!scheme.elements || scheme.elements.length === 0)) {
        return;
    }
    
    // 应用方案中的元素
    const elements = [...scheme.elements]; // 创建副本以避免修改原始方案
    
    // 智能调整元素位置，避免遮挡文本
    const adjustedElements = adjustElementsToAvoidText(elements);
    
    // 应用调整后的元素
    decorativeElements = adjustedElements;
    renderDecorativeElements();
}

// 更新方案预览
function updateSchemePreview(schemeId) {
    // 清空预览区
    schemePreview.innerHTML = '';
    
    if (schemeId === 'none') {
        schemePreview.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        return;
    }
    
    // 获取方案
    const scheme = userElementSchemes[schemeId] || elementSchemes[schemeId];
    
    if (!scheme) {
        return;
    }
    
    // 设置预览背景
    schemePreview.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    
    // 如果是自定义方案且未生成元素，显示提示
    if (schemeId === 'custom' && (!scheme.elements || scheme.elements.length === 0)) {
        const hint = document.createElement('div');
        hint.textContent = '点击生成方案';
        hint.style.position = 'absolute';
        hint.style.top = '50%';
        hint.style.left = '50%';
        hint.style.transform = 'translate(-50%, -50%)';
        hint.style.color = '#00ffff';
        hint.style.fontSize = '12px';
        schemePreview.appendChild(hint);
        return;
    }
    
    // 渲染预览元素（简化版）
    scheme.elements.forEach(element => {
        const previewElement = document.createElement('div');
        previewElement.className = `decorative-element decorative-${element.type}`;
        previewElement.style.position = 'absolute';
        previewElement.style.pointerEvents = 'none';
        
        // 缩放到预览区尺寸
        const scaleFactor = 0.3; // 预览区缩小比例
        previewElement.style.left = `${(element.x * 0.8) + 10}%`; // 10%边距
        previewElement.style.top = `${(element.y * 0.8) + 10}%`; // 10%边距
        previewElement.style.opacity = element.opacity;
        
        // 根据元素类型设置样式
        switch(element.type) {
            case 'line':
            case 'dashed-line':
            case 'curved-line':
                previewElement.style.width = `${element.width * scaleFactor}px`;
                previewElement.style.height = `${element.size * scaleFactor}px`;
                previewElement.style.backgroundColor = element.color;
                break;
            case 'circle':
                previewElement.style.width = `${element.size * scaleFactor}px`;
                previewElement.style.height = `${element.size * scaleFactor}px`;
                previewElement.style.backgroundColor = element.color;
                previewElement.style.borderRadius = '50%';
                break;
            case 'square':
                previewElement.style.width = `${element.size * scaleFactor}px`;
                previewElement.style.height = `${element.size * scaleFactor}px`;
                previewElement.style.backgroundColor = element.color;
                break;
            case 'triangle':
                previewElement.style.width = '0';
                previewElement.style.height = '0';
                previewElement.style.borderLeft = `${(element.size / 2) * scaleFactor}px solid transparent`;
                previewElement.style.borderRight = `${(element.size / 2) * scaleFactor}px solid transparent`;
                previewElement.style.borderBottom = `${element.size * scaleFactor}px solid ${element.color}`;
                break;
            case 'dot':
                previewElement.style.width = `${(element.size / 3) * scaleFactor}px`;
                previewElement.style.height = `${(element.size / 3) * scaleFactor}px`;
                previewElement.style.backgroundColor = element.color;
                previewElement.style.borderRadius = '50%';
                break;
        }
        
        // 添加特殊样式
        if (element.type === 'dashed-line') {
            previewElement.style.backgroundColor = 'transparent';
            previewElement.style.border = `${element.size * scaleFactor}px dashed ${element.color}`;
            previewElement.style.height = '0';
        }
        
        schemePreview.appendChild(previewElement);
    });
}

// 生成自定义元素方案
function generateCustomScheme() {
    const density = parseInt(elementDensitySlider.value);
    const style = schemeStyleSelect.value;
    const colorHarmony = colorHarmonySelect.value;
    
    // 计算元素数量（基于密度）
    const baseElementCount = 10;
    const elementCount = baseElementCount + (density - 1) * 5;
    
    // 生成颜色方案
    const colors = generateColorScheme(colorHarmony);
    
    // 生成元素
    const elements = [];
    
    // 根据风格选择元素类型
    let elementTypes = [];
    switch(style) {
        case 'tech':
            elementTypes = ['line', 'dot'];
            break;
        case 'minimal':
            elementTypes = ['line', 'square', 'circle'];
            break;
        case 'artistic':
            elementTypes = ['triangle', 'circle', 'curved-line'];
            break;
        case 'geometric':
            elementTypes = ['square', 'circle', 'triangle'];
            break;
        default:
            elementTypes = ['line', 'square', 'circle', 'dot'];
    }
    
    // 生成随机元素
    for (let i = 0; i < elementCount; i++) {
        const type = elementTypes[Math.floor(Math.random() * elementTypes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // 生成随机属性
        const element = {
            id: `custom-decor-${Date.now()}-${i}`,
            type: type,
            color: color,
            size: Math.floor(Math.random() * 30) + 10, // 10-40px
            opacity: Math.random() * 0.5 + 0.3, // 0.3-0.8
            x: Math.random() * 80 + 10, // 10-90%
            y: Math.random() * 80 + 10, // 10-90%
            width: type.includes('line') ? Math.floor(Math.random() * 200) + 50 : Math.floor(Math.random() * 50) + 20, // 线条长度或其他元素宽度
            height: type.includes('line') ? Math.floor(Math.random() * 3) + 1 : Math.floor(Math.random() * 50) + 20 // 线条粗细或其他元素高度
        };
        
        elements.push(element);
    }
    
    // 创建自定义方案
    userElementSchemes['custom'] = {
        id: 'custom',
        name: '自定义方案',
        description: `自定义生成的${style}风格元素方案`,
        elements: elements,
        style: style,
        colorHarmony: colorHarmony,
        density: density,
        isBuiltIn: false
    };
    
    // 应用新生成的自定义方案
    applyElementScheme('custom');
    updateSchemePreview('custom');
}

// 生成颜色方案
function generateColorScheme(harmonyType) {
    // 获取当前主题的强调色作为基础色
    const accentColor = primaryColorInput.value || '#00ffff';
    
    // 解析基础色为RGB
    const baseRgb = hexToRgb(accentColor);
    
    switch(harmonyType) {
        case 'monochrome':
            return [
                accentColor,
                adjustBrightness(accentColor, -20),
                adjustBrightness(accentColor, 20),
                adjustBrightness(accentColor, -40),
                adjustBrightness(accentColor, 40)
            ];
            
        case 'complementary':
            return [
                accentColor,
                getComplementaryColor(accentColor),
                adjustBrightness(accentColor, -20),
                adjustBrightness(getComplementaryColor(accentColor), -20)
            ];
            
        case 'analogous':
            return [
                accentColor,
                getAnalogousColor(accentColor, -30),
                getAnalogousColor(accentColor, 30),
                getAnalogousColor(accentColor, -60),
                getAnalogousColor(accentColor, 60)
            ];
            
        case 'triadic':
            return [
                accentColor,
                getTriadicColor(accentColor, 1),
                getTriadicColor(accentColor, 2)
            ];
            
        default: // random
            return [
                accentColor,
                getRandomColor(),
                getRandomColor(),
                getRandomColor(),
                getRandomColor()
            ];
    }
}

// 智能调整元素位置，避免遮挡文本
function adjustElementsToAvoidText(elements) {
    // 获取文本区域的边界
    const textBoundingBoxes = getTextBoundingBoxes();
    
    // 定义安全距离（百分比）
    const safeDistancePercent = 5;
    
    // 最大尝试次数
    const maxAttempts = 20;
    
    // 调整每个元素的位置
    return elements.map(element => {
        const adjustedElement = { ...element };
        let attempts = 0;
        let isOverlappingWithText = false;
        
        do {
            // 重置重叠标志
            isOverlappingWithText = false;
            
            // 计算元素的边界框（考虑安全距离）
            const elementSizePercent = Math.max(adjustedElement.width / markdownPreview.offsetWidth * 100, adjustedElement.height / markdownPreview.offsetHeight * 100) / 2;
            const elementBox = {
                x1: adjustedElement.x - safeDistancePercent,
                y1: adjustedElement.y - safeDistancePercent,
                x2: adjustedElement.x + elementSizePercent + safeDistancePercent,
                y2: adjustedElement.y + elementSizePercent + safeDistancePercent
            };
            
            // 检查是否与任何文本区域重叠
            for (const textBox of textBoundingBoxes) {
                if (isOverlapping(elementBox, textBox)) {
                    isOverlappingWithText = true;
                    break;
                }
            }
            
            // 如果重叠，尝试移动元素
            if (isOverlappingWithText && attempts < maxAttempts) {
                // 随机选择一个方向和距离移动元素
                const direction = Math.floor(Math.random() * 4); // 0: 上, 1: 右, 2: 下, 3: 左
                const moveDistance = 5 + Math.random() * 5; // 5-10%的移动距离
                
                switch(direction) {
                    case 0: // 上
                        adjustedElement.y = Math.max(5, adjustedElement.y - moveDistance);
                        break;
                    case 1: // 右
                        adjustedElement.x = Math.min(95, adjustedElement.x + moveDistance);
                        break;
                    case 2: // 下
                        adjustedElement.y = Math.min(95, adjustedElement.y + moveDistance);
                        break;
                    case 3: // 左
                        adjustedElement.x = Math.max(5, adjustedElement.x - moveDistance);
                        break;
                }
                
                attempts++;
            }
            
        } while (isOverlappingWithText && attempts < maxAttempts);
        
        // 确保元素始终在预览区内
        adjustedElement.x = Math.max(5, Math.min(95, adjustedElement.x));
        adjustedElement.y = Math.max(5, Math.min(95, adjustedElement.y));
        
        return adjustedElement;
    });
}

// 获取文本区域的边界
function getTextBoundingBoxes() {
    const boxes = [];
    
    // 获取所有文本元素
    const textElements = markdownPreview.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, blockquote, code, pre, a');
    
    textElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const previewRect = markdownPreview.getBoundingClientRect();
        
        // 转换为相对于预览区的百分比坐标
        const x1 = ((rect.left - previewRect.left) / previewRect.width) * 100;
        const y1 = ((rect.top - previewRect.top) / previewRect.height) * 100;
        const x2 = ((rect.right - previewRect.left) / previewRect.width) * 100;
        const y2 = ((rect.bottom - previewRect.top) / previewRect.height) * 100;
        
        boxes.push({ x1, y1, x2, y2 });
    });
    
    return boxes;
}

// 检查两个边界框是否重叠
function isOverlapping(box1, box2) {
    return box1.x1 < box2.x2 && box1.x2 > box2.x1 && box1.y1 < box2.y2 && box1.y2 > box2.y1;
}

// 保存当前方案
function saveCurrentScheme() {
    if (currentElementScheme === 'none') {
        alert('没有可保存的元素方案');
        return;
    }
    
    const schemeName = prompt('请输入方案名称:');
    if (!schemeName || schemeName.trim() === '') {
        alert('方案名称不能为空');
        return;
    }
    
    // 获取当前方案
    const currentScheme = userElementSchemes[currentElementScheme] || elementSchemes[currentElementScheme];
    
    if (!currentScheme) {
        alert('当前方案未找到');
        return;
    }
    
    // 创建新的用户方案
    const newSchemeId = `user-${Date.now()}`;
    userElementSchemes[newSchemeId] = {
        ...currentScheme,
        id: newSchemeId,
        name: schemeName.trim(),
        description: `用户保存的${currentScheme.style}风格元素方案`,
        savedAt: new Date().toISOString(),
        isBuiltIn: false
    };
    
    // 将用户方案保存到localStorage
    saveUserSchemesToLocalStorage();
    
    // 更新方案选择器
    updateSchemeSelector();
    
    alert('方案保存成功！');
}

// 加载已保存方案
function loadSavedScheme() {
    // 如果没有用户方案，提示用户
    const userSchemeIds = Object.keys(userElementSchemes);
    if (userSchemeIds.length === 0) {
        alert('没有已保存的用户方案');
        return;
    }
    
    // 创建方案选择对话框
    const schemeNames = userSchemeIds.map(id => `${userElementSchemes[id].name} (${id})`).join('\n');
    const selectedSchemeId = prompt(`请输入要加载的方案ID:\n${schemeNames}`);
    
    if (!selectedSchemeId || !userElementSchemes[selectedSchemeId]) {
        alert('无效的方案ID');
        return;
    }
    
    // 应用选中的方案
    applyElementScheme(selectedSchemeId);
    updateSchemePreview(selectedSchemeId);
    
    // 更新方案选择器
    schemeSelect.value = selectedSchemeId;
    customSchemeControls.style.display = 'none';
}

// 将用户方案保存到localStorage
function saveUserSchemesToLocalStorage() {
    try {
        localStorage.setItem('markdown-image-generator-element-schemes', JSON.stringify(userElementSchemes));
        console.log('用户元素方案已保存到localStorage');
    } catch (error) {
        console.error('保存用户元素方案到localStorage失败:', error);
    }
}

// 从localStorage加载用户方案
function loadUserSchemesFromLocalStorage() {
    try {
        const savedSchemes = localStorage.getItem('markdown-image-generator-element-schemes');
        if (savedSchemes) {
            userElementSchemes = JSON.parse(savedSchemes);
            console.log('用户元素方案已从localStorage加载');
            updateSchemeSelector();
        }
    } catch (error) {
        console.error('从localStorage加载用户元素方案失败:', error);
    }
}

// 更新方案选择器
function updateSchemeSelector() {
    // 保存当前选中的方案
    const currentValue = schemeSelect.value;
    
    // 移除所有用户方案选项
    const userOptions = schemeSelect.querySelectorAll('option[data-user-scheme]');
    userOptions.forEach(option => option.remove());
    
    // 添加用户方案选项
    const userSchemeIds = Object.keys(userElementSchemes);
    userSchemeIds.forEach(id => {
        const scheme = userElementSchemes[id];
        if (scheme.id !== 'custom' && !scheme.isBuiltIn) {
            const option = document.createElement('option');
            option.value = id;
            option.textContent = scheme.name;
            option.setAttribute('data-user-scheme', 'true');
            schemeSelect.appendChild(option);
        }
    });
    
    // 恢复当前选中的方案
    if (userElementSchemes[currentValue] || elementSchemes[currentValue]) {
        schemeSelect.value = currentValue;
    }
}

// 工具函数

// 十六进制颜色转RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// RGB转十六进制颜色
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// 调整颜色亮度
function adjustBrightness(hex, percent) {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    
    const r = Math.max(0, Math.min(255, Math.round(rgb.r + rgb.r * percent / 100)));
    const g = Math.max(0, Math.min(255, Math.round(rgb.g + rgb.g * percent / 100)));
    const b = Math.max(0, Math.min(255, Math.round(rgb.b + rgb.b * percent / 100)));
    
    return rgbToHex(r, g, b);
}

// 获取互补色
function getComplementaryColor(hex) {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    
    return rgbToHex(255 - rgb.r, 255 - rgb.g, 255 - rgb.b);
}

// 获取类似色
function getAnalogousColor(hex, degrees) {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    
    // RGB转HSL
    let r = rgb.r / 255;
    let g = rgb.g / 255;
    let b = rgb.b / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        
        h /= 6;
    }
    
    // 调整色相
    h += degrees / 360;
    if (h < 0) h += 1;
    if (h > 1) h -= 1;
    
    // HSL转RGB
    let r1, g1, b1;
    
    if (s === 0) {
        r1 = g1 = b1 = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        
        r1 = hue2rgb(p, q, h + 1/3);
        g1 = hue2rgb(p, q, h);
        b1 = hue2rgb(p, q, h - 1/3);
    }
    
    return rgbToHex(Math.round(r1 * 255), Math.round(g1 * 255), Math.round(b1 * 255));
}

// 获取三角色
function getTriadicColor(hex, index) {
    const angles = [120, 240]; // 三角色的角度差
    return getAnalogousColor(hex, angles[index - 1]);
}

// 获取随机颜色
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// 初始化时加载用户方案
loadUserSchemesFromLocalStorage();

// 更新方案选择器
updateSchemeSelector();