const list = {
    wjn: {
        name: '韦家碾',
        line: [1],
        position: [9, 1],
        next: ['sxf']
    },
    sxf: {
        name: '升仙湖',
        line: [1],
        position: [9, 2],
        next: ['wjn', 'hcbz']
    },
    rmbl: {
        name: '人民北路',
        line: [1],
        position: [9, 4],
        next: ['hcbz', 'wsy']
    },
    wsy: {
        name: '文殊院',
        line: [1],
        position: [9, 5],
        next: ['rmbl', 'lms'],
    },
    jjbg: {
        name: '锦江宾馆',
        line: [1],
        position: [9, 9],
        next: ['tfgc', 'hxb'],
        textAlign: 'end',
    },
    hxb: {
        name: '华西坝',
        line: [1],
        position: [9, 11],
        next: ['jjbg', 'styg'],
        textAlign: 'end'
    },
    njq: {
        name: '倪家桥',
        line: [1],
        position: [9, 14],
        next: ['styg', 'txl']
    },
    txl: {
        name: '桐梓林',
        line: [1],
        position: [9, 15],
        next: ['njq', 'hcnz']
    },
    gx: {
        name: '高新',
        line: [1],
        position: [9, 17],
        next: ['hcnz']
    },
    yxlj: {
        name: '羊犀立交',
        line: [2],
        position: [2, 2],
        next: ['yptx']
    },
    shld: {
        name: '蜀汉路东',
        line: [2],
        position: [4, 4],
        next: ['yptx', 'bgl'],
    },
    bgl: {
        name: '白果林',
        line: [2],
        position: [5, 5],
        next: ['shld', 'zydsyy'],
    },
    thm: {
        name: '通惠门',
        line: [2],
        position: [7, 7],
        next: ['zydsyy', 'rmgy'],
    },
    rmgy: {
        name: '人民公园',
        line: [2],
        position: [8, 8],
        next: ['thm', 'tfgc'],
        textAlign: 'end',
        textBaseline: 'top'
    },
    tfgc: {
        name: '天府广场',
        line: [2, 1],
        position: [9, 8],
        next: ['rmgy', 'cxl', 'jjbg', 'lms'],
    },
    dmdq: {
        name: '东门大桥',
        line: [2],
        position: [11, 10],
        next: ['cxl', 'nwm'],
    },
    nwm: {
        name: '牛王庙',
        line: [2],
        position: [12, 11],
        next: ['dmdq', 'nsk'],
        textAlign: 'end'
    },
    nsk: {
        name: '牛市口',
        line: [2],
        position: [13, 11],
        next: ['nwm', 'ddl'],
        textBaseline: 'top',
        offset: [0, 10]
    },
    ddl: {
        name: '东大陆',
        line: [2],
        position: [14, 11],
        next: ['nsk', 'tzsgy'],
    },
    tzsgy: {
        name: '塔子山公园',
        line: [2],
        position: [15, 12],
        next: ['ddl', 'cddkz'],
        textAlign: 'end'
    },
    cylj: {
        name: '成渝立交',
        line: [2],
        position: [17, 14],
        next: ['cddkz'],
    },
    zjsnl: {
        name: '昭觉寺南路',
        line: [3],
        position: [13, 1],
        next: ['smq']
    },
    jjt: {
        name: '李家沱',
        line: [3],
        position: [12, 4],
        next: ['smq', 'qfl'],
    },
    qfl: {
        name: '前锋路',
        line: [3],
        position: [12, 5],
        next: ['jjt', 'hxl'],
    },
    hxl: {
        name: '红星路',
        line: [3],
        position: [12, 6],
        next: ['qfl', 'seyy'],
    },
    cxl: {
        name: '春熙路',
        line: [3, 2],
        position: [10, 9],
        next: ['seyy', 'xnm', 'tfgc', 'dmdq'],
    },
    xnm: {
        name: '新南门',
        line: [3],
        position: [10, 11],
        next: ['cxl', 'mzq'],
    },
    mzq: {
        name: '磨子桥',
        line: [3],
        position: [10, 12],
        next: ['xnm', 'styg'],
    },
    styg: {
        name: '省体育馆',
        line: [3, 1],
        position: [9, 13],
        next: ['mzq', 'ygm', 'hxb', 'njq'],
    },
    ygm: {
        name: '衣冠庙',
        line: [3],
        position: [7, 13],
        next: ['styg', 'gsq'],
        offset: [0, 14]
    },
    gsq: {
        name: '高升桥',
        line: [3],
        position: [4, 13],
        next: ['ygm', 'hpl'],
        offset: [0, 14]
    },
    hpl: {
        name: '红牌楼',
        line: [3],
        position: [3, 14],
        next: ['gsq', 'tpy'],
    },
    zj: {
        name: '族锦',
        line: [3],
        position: [1, 17],
        next: ['tpy'],
    },
    qjxl: {
        name: '清江西路',
        line: [4],
        position: [1, 6],
        offset: [0, 16],
        next: ['whg'],
        textAlign: 'center'
    },
    xncd: {
        name: '西南财大',
        line: [4],
        position: [4, 6],
        offset: [0, 16],
        next: ['whg', 'ctbl']
    },
    ctbl: {
        name: '草堂北路',
        line: [4],
        position: [5, 6],
        offset: [0, 16],
        next: ['xncd', 'zydsyy']
    },
    zydsyy: {
        name: '中医大省医院',
        line: [4, 2],
        position: [7, 6],
        next: ['ctbl', 'kzxz', 'thm', 'ggl'],
    },
    kzxz: {
        name: '宽窄巷子',
        line: [4],
        position: [8, 6],
        offset: [0, 16],
        textAlign: 'end',
        next: ['zydsyy', 'lms'],
    },
    lms: {
        name: '骡马市',
        line: [4, 1],
        position: [9, 6],
        next: ['kzxz', 'tsnl', 'tfgc', 'wsy']
    },
    tsnl: {
        name: '太升南路',
        line: [4],
        position: [10, 6],
        next: ['lms', 'seyy']
    },
    seyy: {
        name: '市二医院',
        line: [4, 3],
        position: [12, 7],
        next: ['tsnl', 'ysl', 'cxl', 'hxl']
    },
    ysl: {
        name: '玉双路',
        line: [4],
        position: [13, 8],
        offset: [0, 16],
        next: ['seyy', 'sql']
    },
    sql: {
        name: '双桥路',
        line: [4],
        position: [14, 8],
        offset: [0, 16],
        next: ['ysl', 'wnc']
    },
    wnc: {
        name: '万年场',
        line: [4],
        position: [15, 8],
        offset: [0, 16],
        next: ['sql', 'wnc']
    },
    ll: {
        name: '来龙',
        line: [4],
        position: [17, 8],
        offset: [0, 16],
        next: ['hsz']
    },
    hcbz: {
        name: '火车北站',
        line: [7, 1],
        position: [9, 3],
        next: ['bzxel', 'smq', 'rmbl', 'sxf']
    },
    smq: {
        name: '驷马桥',
        line: [7, 3],
        position: [12, 3],
        next: ['hcbz', 'fql', 'ljt', 'zjsnl']
    },
    fql: {
        name: '府青路',
        line: [7],
        position: [14, 3],
        offset: [0, 16],
        next: ['smq', 'bzl']
    },
    bzl: {
        name: '八庄里',
        line: [7],
        position: [16, 3],
        next: ['fql', 'ejq']
    },
    ejq: {
        name: '二家桥',
        line: [7],
        position: [16, 4],
        next: ['bzl', 'lgdx']
    },
    lgdx: {
        name: '理工大学',
        line: [7],
        position: [16, 5],
        next: ['ejq', 'cjd']
    },
    cjd: {
        name: '崔家店',
        line: [7],
        position: [16, 6],
        next: ['lgdx', 'sdl']
    },
    sdl: {
        name: '双电路',
        line: [7],
        position: [16, 7],
        next: ['cjd', 'hsz']
    },
    hsz: {
        name: '槐树站',
        line: [7, 4],
        position: [16, 8],
        next: ['sdl', 'yhl', 'wnc', 'll']
    },
    yhl: {
        name: '迎辉路',
        line: [7],
        position: [16, 12],
        next: ['hsz', 'cddkz']
    },
    cddkz: {
        name: '成都东客站',
        line: [7, 2],
        position: [16, 13],
        next: ['yhl', 'dg', 'tzsgy', 'cylj']
    },
    dg: {
        name: '大观',
        line: [7],
        position: [16, 16],
        next: ['cddkz', 'szs']
    },
    szs: {
        name: '狮子山',
        line: [7],
        position: [15, 16],
        offset: [0, 16],
        next: ['dg', 'scsd']
    },
    scsd: {
        name: '四川师大',
        line: [7],
        position: [13, 16],
        offset: [0, 16],
        next: ['szs', 'llc']
    },
    llc: {
        name: '琉璃厂',
        line: [7],
        position: [11, 16],
        offset: [0, 16],
        next: ['scsd', 'swy']
    },
    swy: {
        name: '三瓦窑',
        line: [7],
        position: [10, 16],
        offset: [0, -16],
        next: ['llc', 'hcnz']
    },
    hcnz: {
        name: '火车南站',
        line: [7, 1],
        position: [9, 16],
        next: ['swy', 'sxs', 'txl', 'gx']
    },
    sxs: {
        name: '神仙树',
        line: [7],
        position: [8, 16],
        offset: [0, -16],
        next: ['hcnz', 'gpdd']
    },
    gpdd: {
        name: '高朋大道',
        line: [7],
        position: [6, 16],
        offset: [0, -16],
        next: ['sxs', 'tpy']
    },
    whdd: {
        name: '武侯大道',
        line: [7],
        position: [2, 14],
        textAlign: 'end',
        next: ['tpy', 'lzy']
    },
    lzy: {
        name: '龙爪堰',
        line: [7],
        position: [2, 11],
        textAlign: 'end',
        next: ['whdd', 'dpl']
    },
    dpl: {
        name: '东坡路',
        line: [7],
        position: [2, 8],
        next: ['lzy', 'whg']
    },
    whg: {
        name: '文化宫',
        line: [7, 3],
        position: [2, 6],
        next: ['dpl', 'jsbwg', 'xncd', 'qjxl']
    },
    jsbwg: {
        name: '金沙博物馆',
        line: [7],
        position: [2, 4],
        next: ['whg', 'yptx']
    },
    yptx: {
        name: '一品天下',
        line: [7, 2],
        position: [3, 3],
        next: ['jsbwg', 'cdz', 'shld', 'yxlj']
    },
    cdz: {
        name: '茶店子',
        line: [7],
        position: [4, 3],
        offset: [0, 16],
        next: ['yptx', 'hzb']
    },
    hzb: {
        name: '花照壁',
        line: [7],
        position: [5, 3],
        offset: [0, -16],
        next: ['cdz', 'xnjd']
    },
    xnjd: {
        name: '西南交大',
        line: [7],
        position: [6, 3],
        offset: [0, 16],
        next: ['hzb', 'jlt']
    },
    jlt: {
        name: '九里提',
        line: [7],
        position: [7, 3],
        offset: [0, -16],
        next: ['xnjd', 'bzxel']
    },
    bzxel: {
        name: '北站西二路',
        line: [7],
        position: [8, 3],
        offset: [0, 16],
        next: ['jlt', 'hcbz'],
        textAlign: 'center'
    },
    tpy: {
        name: '太平园',
        line: [10, 7, 3],
        position: [2, 16],
        next: ['czlj', 'gpdd', 'whdd', 'hpl', 'zj']
    },
    czlj: {
        name: '川藏立交',
        line: [10],
        position: [1, 16],
        offset: [-16, -16],
        next: ['tpy'],
    }
}

const lineColor = {
    1: '#1E51A0',
    2: '#f7945b',
    3: '#ed008c',
    4: '#01ab53',
    7: '#c1f2fc',
    10: '#000000'
}

export {
    list,
    lineColor
}