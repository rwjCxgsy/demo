const line1 = {
    name: '一号线',
    value: 'line1',
    type: 1,
    color: 'blue',
    lineColor: 'rgb(159, 159, 255)',
    list: {
        wjn: {
            name: '韦家碾',
            srot: 1,
            position: [9, 1],
            next: ['sxf']
        },
        sxf: {
            srot: 2,
            name: '升仙湖',
            position: [9, 2],
            next: ['hcbz', 'hcbz']
        },
        hcbz: {
            srot: 3,
            name: '火车北站',
            position: [9, 3],
            next: ['sxf', 'rmbl', 'xnjd', 'smq'],
            offset: [0, 16]
        },
        rmbl: {
            srot: 4,
            name: '人民北路',
            position: [9, 4],
            next: ['hcbz', 'wsy']
        },
        wsy: {
            srot: 5,
            name: '文殊院',
            position: [9, 5],
            next: ['rmbl', 'lms'],
        },
        lms: {
            srot: 6,
            name: '骡马市',
            position: [9, 6],
            next: ['wsy', 'tfgc', 'tsnl', 'kzxz'],
            offset: [0, 16]
        },
        tfgc: {
            srot: 7,
            name: '天府广场',
            position: [9, 8],
            next: ['jjbg', 'rmgy', 'cxl']
        },
        jjbg: {
            srot: 8,
            name: '锦江宾馆',
            position: [9, 9],
            next: ['tfgc', 'hxb'],
            textAlign: 'end',
            textBaseline: 'middle',
            direction: 'rtl'
        },
        hxb: {
            srot: 9,
            name: '华西坝',
            position: [9, 11],
            next: ['jjbg', 'styg'],
            textAlign: 'end'
        },
        styg: {
            srot: 9,
            name: '省体育馆',
            position: [9, 13],
            next: ['hxb', 'njq', 'mzq', 'ygm']
        },
        njq: {
            srot: 11,
            name: '倪家桥',
            position: [9, 14],
            next: ['styg', 'txl']
        },
        txl: {
            srot: 12,
            name: '桐梓林',
            position: [9, 15],
            next: ['njq', 'hcnz']
        },
        hcnz: {
            srot: 13,
            name: '火车南站',
            position: [9, 16],
            next: ['txl', 'gx', 'swy', 'sxs'],
            offset: [0, 16]
        },
        gx: {
            srot: 14,
            name: '高新',
            position: [9, 17],
            next: ['hcnz']
        }
    }
}

const line2 = {
    name: '二号线',
    value: 'line2',
    type: 1,
    color: '#f7945b',
    lineColor: '#ffd4bb',
    list: {
        yxlj: {
            name: '羊犀立交',
            srot: 1,
            position: [2, 2],
            next: ['yptx']
        },
        yptx: {
            name: '一品天下',
            srot: 2,
            position: [3, 3],
            next: ['yxlj', 'shld', 'jsbwg', 'cdz'],
            offset: [0, -16]
        },
        shld: {
            name: '蜀汉路东',
            srot: 3,
            position: [4, 4],
            next: ['yptx', 'bgl'],
        },
        bgl: {
            name: '白果林',
            srot: 4,
            position: [5, 5],
            next: ['shld', 'zydsyy'],
        },
        zydsyy: {
            name: '中医大省医院',
            srot: 5,
            position: [6, 6],
            next: ['bgl', 'zydsyy', 'ctbl', 'kzxz'],
            offset: [0, -16]
        },
        thm: {
            name: '通惠门',
            srot: 6,
            position: [7, 7],
            next: ['zydsyy', 'rmgy'],
        },
        rmgy: {
            name: '人民公园',
            srot: 7,
            position: [8, 8],
            next: ['thm', 'tfgc'],
            textAlign: 'end',
            textBaseline: 'top'
        },
        tfgc: {
            name: '天府广场',
            srot: 8,
            position: [9, 8],
            next: ['rmgy', 'cxl', 'lms', 'jjbg'],
        },
        cxl: {
            name: '春熙路',
            srot: 9,
            position: [10, 9],
            next: ['tfgc', 'dmdq', 'seyy', 'xnm'],
        },
        dmdq: {
            name: '东门大桥',
            srot: 9,
            position: [11, 10],
            next: ['cxl', 'nwm'],
        },
        nwm: {
            name: '牛王庙',
            srot: 11,
            position: [12, 11],
            next: ['dmdq', 'nsk'],
            textAlign: 'end'
        },
        nsk: {
            name: '牛市口',
            srot: 12,
            position: [13, 11],
            next: ['nwm', 'ddl'],
            textBaseline: 'top',
            offset: [0, 10]
        },
        ddl: {
            name: '东大陆',
            srot: 13,
            position: [14, 11],
            next: ['nsk', 'tzsgy'],
        },
        tzsgy: {
            name: '塔子山公园',
            srot: 14,
            position: [15, 12],
            next: ['ddl', 'cddkz'],
            textAlign: 'end'
        },
        cddkz: {
            name: '成都东客站',
            srot: 15,
            position: [16, 13],
            next: ['tzsgy', 'cylj', 'yhl', 'dg'],
        },
        cylj: {
            name: '成渝立交',
            srot: 16,
            position: [17, 14],
            next: ['cddkz'],
        }
    }
}

const line3 = {
    name: '三号线',
    value: 'line3',
    type: 1,
    color: '#ed008c',
    lineColor: '#ff7cc8',
    list: {
        zjsnl: {
            name: '昭觉寺南路',
            srot: 1,
            position: [13, 2],
            next: ['smq']
        },
        smq: {
            name: '驷马桥',
            srot: 1,
            position: [12, 3],
            next: ['zjsnl', 'jjt', 'hcbz', 'fql'],
            offset: [0, 16]
        },
        jjt: {
            name: '李家沱',
            srot: 1,
            position: [12, 4],
            next: ['smq', 'qfl'],
        },
        qfl: {
            name: '前锋路',
            srot: 1,
            position: [12, 5],
            next: ['jjt', 'hxl'],
        },
        hxl: {
            name: '红星路',
            srot: 1,
            position: [12, 6],
            next: ['qfl', 'seyy'],
        },
        seyy: {
            name: '市二医院',
            srot: 1,
            position: [12, 7],
            next: ['hxl', 'cxl', 'lms', 'ysl'],
        },
        cxl: {
            name: '春熙路',
            srot: 1,
            position: [10, 9],
            next: ['seyy', 'xnm', 'tfgc', 'dmdq'],
        },
        xnm: {
            name: '新南门',
            srot: 1,
            position: [10, 11],
            next: ['cxl', 'mzq'],
        },
        mzq: {
            name: '磨子桥',
            srot: 1,
            position: [10, 12],
            next: ['xnm', 'styg'],
        },
        styg: {
            name: '省体育馆',
            srot: 1,
            position: [9, 13],
            next: ['mzq', 'ygm', 'hxb', 'njq'],
        },
        ygm: {
            name: '衣冠庙',
            srot: 1,
            position: [7, 13],
            next: ['styg', 'gsq'],
            offset: [0, 14]
        },
        gsq: {
            name: '高升桥',
            srot: 1,
            position: [4, 13],
            next: ['ygm', 'hpl'],
            offset: [0, 14]
        },
        hpl: {
            name: '红牌楼',
            srot: 1,
            position: [3, 14],
            next: ['gsq', 'tpy'],
        },
        tpy: {
            name: '太平园',
            srot: 1,
            position: [2, 16],
            next: ['hpl', 'zj', 'whdd', 'gpdd'],
            offset: [0, 16]
        },
        zj: {
            name: '族锦',
            srot: 1,
            position: [1, 17],
            next: ['tpy'],
        },
    }
}

const line4 = {
    name: '四号线',
    value: 'line4',
    type: 1,
    color: '#01ab53',
    lineColor: '#9affcb',
    list: {
        qjxl: {
            name: '清江西路',
            position: [1, 6],
            offset: [0, 16],
            next: ['whg'],
            textAlign: 'center'
        },
        whg: {
            name: '文化宫',
            position: [2, 6],
            offset: [0, 16],
            next: ['qjxl', 'xncd', 'jsbwg', 'dpl']
        },
        xncd: {
            name: '西南财大',
            position: [4, 6],
            offset: [0, 16],
            next: ['whg', 'ctbl']
        },
        ctbl: {
            name: '草堂北路',
            position: [5, 6],
            offset: [0, 16],
            next: ['xncd', 'zydsyy']
        },
        zydsyy: {
            name: '中医大省医院',
            position: [7, 6],
            next: ['ctbl', 'kzxz', 'ggl', 'thm'],
        },
        kzxz: {
            name: '宽窄巷子',
            position: [8, 6],
            offset: [0, 16],
            textAlign: 'end',
            next: ['zydsyy', 'lms'],
        },
        lms: {
            name: '骡马市',
            position: [9, 6],
            next: ['kzxz', 'tsnl', 'wsy', 'tfgc']
        },
        tsnl: {
            name: '太升南路',
            position: [10, 6],
            next: ['lms', 'seyy']
        },
        seyy: {
            name: '市二医院',
            position: [12, 7],
            next: ['tsnl', 'ysl', 'hxl', 'cxl']
        },
        ysl: {
            name: '玉双路',
            position: [13, 8],
            offset: [0, 16],
            next: ['seyy', 'sql']
        },
        sql: {
            name: '双桥路',
            position: [14, 8],
            offset: [0, 16],
            next: ['ysl', 'wnc']
        },
        wnc: {
            name: '万年场',
            position: [15, 8],
            offset: [0, 16],
            next: ['sql', 'wnc']
        },
        hsz: {
            name: '槐树站',
            position: [16, 8],
            offset: [0, 16],
            next: ['wnc', 'll', 'sdl', 'yhl']
        },
        ll: {
            name: '来龙',
            position: [17, 8],
            offset: [0, 16],
            next: ['hsz']
        }
    }
}

const line7 = {
    value: 'line7',
    type: 0,
    name: '七号线',
    color: '#88d4e4',
    lineColor: '#c1f2fc',
    list: {
        hcbz: {
            name: '火车北站',
            position: [9, 3],
            next: ['bzxel', 'smq', 'sxf', 'rmbl']
        },
        smq: {
            name: '驷马桥',
            position: [12, 3],
            next: ['hcbz', 'fql', 'zjsnl', 'ljt']
        },
        fql: {
            name: '府青路',
            position: [14, 3],
            offset: [0, 16],
            next: ['smq', 'bzl']
        },
        bzl: {
            name: '八庄里',
            position: [16, 3],
            next: ['fql', 'ejq']
        },
        ejq: {
            name: '二家桥',
            position: [16, 4],
            next: ['bzl', 'lgdx']
        },
        lgdx: {
            name: '理工大学',
            position: [16, 5],
            next: ['ejq', 'cjd']
        },
        cjd: {
            name: '崔家店',
            position: [16, 6],
            next: ['lgdx', 'sdl']
        },
        sdl: {
            name: '双电路',
            position: [16, 7],
            next: ['cjd', 'hsz']
        },
        hsz: {
            name: '槐树站',
            position: [16, 8],
            next: ['sdl', 'yhl', 'll', 'wnc']
        },
        yhl: {
            name: '迎辉路',
            position: [16, 12],
            next: ['hsz', 'cddkz']
        },
        cddkz: {
            name: '成都东客站',
            position: [16, 13],
            next: ['yhl', 'dg', 'tzsgy', 'cylj']
        },
        dg: {
            name: '大观',
            position: [16, 16],
            next: ['cddkz', 'szs']
        },
        szs: {
            name: '狮子山',
            position: [15, 16],
            offset: [0, 16],
            next: ['dg', 'scsd']
        },
        scsd: {
            name: '四川师大',
            position: [13, 16],
            offset: [0, 16],
            next: ['szs', 'llc']
        },
        llc: {
            name: '琉璃厂',
            position: [11, 16],
            offset: [0, 16],
            next: ['scsd', 'swy']
        },
        swy: {
            name: '三瓦窑',
            position: [10, 16],
            offset: [0, -16],
            next: ['llc', 'hcnz']
        },
        hcnz: {
            name: '火车南站',
            position: [9, 16],
            next: ['swy', 'sxs', 'txl', 'gx']
        },
        sxs: {
            name: '神仙树',
            position: [8, 16],
            offset: [0, -16],
            next: ['hcnz', 'gpdd']
        },
        gpdd: {
            name: '高朋大道',
            position: [6, 16],
            offset: [0, -16],
            next: ['sxs', 'tpy']
        },
        tpy: {
            name: '太平园',
            position: [2, 16],
            next: ['gpdd', 'whdd', 'hpl', 'zj']
        },
        whdd: {
            name: '武侯大道',
            position: [2, 14],
            textAlign: 'end',
            next: ['tpy', 'lzy']
        },
        lzy: {
            name: '龙爪堰',
            position: [2, 11],
            textAlign: 'end',
            next: ['whdd', 'dpl']
        },
        dpl: {
            name: '东坡路',
            position: [2, 8],
            next: ['lzy', 'whg']
        },
        whg: {
            name: '文化宫',
            position: [2, 6],
            next: ['dpl', 'jsbwg', 'xncd', 'qjxl']
        },
        jsbwg: {
            name: '金沙博物馆',
            position: [2, 4],
            next: ['whg', 'yptx']
        },
        yptx: {
            name: '一品天下',
            position: [3, 3],
            next: ['jsbwg', 'cdz', 'yxlj', 'shld']
        },
        cdz: {
            name: '茶店子',
            position: [4, 3],
            offset: [0, 16],
            next: ['yptx', 'hzb']
        },
        hzb: {
            name: '花照壁',
            position: [5, 3],
            offset: [0, -16],
            next: ['cdz', 'xnjd']
        },
        xnjd: {
            name: '西南交大',
            position: [6, 3],
            offset: [0, 16],
            next: ['hzb', 'jlt']
        },
        jlt: {
            name: '九里提',
            position: [7, 3],
            offset: [0, -16],
            next: ['xnjd', 'bzxel']
        },
        bzxel: {
            name: '北站西二路',
            position: [8, 3],
            offset: [0, 16],
            next: ['jlt', 'hcbz'],
            textAlign: 'center'
        },
    }
}

export default {
    line1,
    line2,
    line3,
    line4,
    line7
}