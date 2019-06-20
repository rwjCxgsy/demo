const line1 = {
    name: '一号线',
    type: 1,
    color: 'blue',
    lineColor: 'rgb(159, 159, 255)',
    list: {
        wjn: {
            name: '韦家碾',
            srot: 1,
            position: [9, 1],
            prev: null,
            next: 'sxf'
        },
        sxf: {
            srot: 2,
            name: '升仙湖',
            position: [9, 2],
            prev: 'wjn',
            next: 'hcbz'
        },
        hcbz: {
            srot: 3,
            name: '火车北站',
            position: [9, 3],
            prev: ['sxf', 'xnjd', 'smq'],
            next: ['rmbl', 'xnjd', 'smq'],
            offset: [0, 16]
        },
        rmbl: {
            srot: 4,
            name: '人民北路',
            position: [9, 4],
            prev: 'hcbz',
            next: 'wsy'
        },
        wsy: {
            srot: 5,
            name: '文殊院',
            position: [9, 5],
            prev: 'rmbl',
            next: 'lus'
        },
        lms: {
            srot: 6,
            name: '骡马市',
            position: [9, 6],
            prev: 'wsy',
            next: 'tfgc',
            offset: [0, 16]
        },
        tfgc: {
            srot: 7,
            name: '天府广场',
            position: [9, 8],
            prev: ['lms', 'rmgy', 'cxl'],
            next: ['jjbg', 'rmgy', 'cxl']
        },
        jjbg: {
            srot: 8,
            name: '锦江宾馆',
            position: [9, 9],
            prev: 'tfgc',
            next: 'hxb',
            textAlign: 'end',
            textBaseline: 'middle',
            direction: 'rtl'
        },
        hxb: {
            srot: 9,
            name: '华西坝',
            position: [9, 11],
            prev: 'jjbg',
            next: 'styg'
        },
        styg: {
            srot: 9,
            name: '省体育馆',
            position: [9, 13],
            prev: 'hxb',
            next: ['njq', 'mzq', 'ygm']
        },
        njq: {
            srot: 11,
            name: '倪家桥',
            position: [9, 14],
            prev: 'styg',
            next: 'txl'
        },
        txl: {
            srot: 12,
            name: '桐梓林',
            position: [9, 15],
            prev: 'njq',
            next: 'hcnz'
        },
        hcnz: {
            srot: 13,
            name: '火车南站',
            position: [9, 16],
            prev: 'txl',
            next: ['gx', 'swy', 'sxs'],
            offset: [0, 16]
        },
        gx: {
            srot: 14,
            name: '高新',
            position: [9, 17],
            prev: 'styg',
            next: 'txl'
        }
    }
}

const line2 = {
    name: '二号线',
    type: 1,
    color: '#f7945b',
    lineColor: '#ffd4bb',
    list: {
        yxlj: {
            name: '羊犀立交',
            srot: 1,
            position: [2, 2],
            prev: null,
            next: 'yptx'
        },
        yptx: {
            name: '一品天下',
            srot: 2,
            position: [3, 3],
            prev: 'yxlj',
            next: 'shld',
            offset: [0, -16]
        },
        shld: {
            name: '蜀汉路东',
            srot: 3,
            position: [4, 4],
            prev: 'yptx',
            next: 'bgl'
        },
        bgl: {
            name: '白果林',
            srot: 4,
            position: [5, 5],
            prev: 'shld',
            next: 'zydsyy'
        },
        zydsyy: {
            name: '中医大省医院',
            srot: 5,
            position: [6, 6],
            prev: 'shld',
            next: 'zydsyy',
            offset: [0, -16]
        },
        thm: {
            name: '通惠门',
            srot: 6,
            position: [7, 7],
            prev: 'shld',
            next: 'rmgy'
        },
        rmgy: {
            name: '人民公园',
            srot: 7,
            position: [8, 8],
            prev: 'thm',
            next: 'tfgc',
            textAlign: 'end',
            textBaseline: 'top'
        },
        tfgc: {
            name: '天府广场',
            srot: 8,
            position: [9, 8],
            prev: 'shld',
            next: 'cxl'
        },
        cxl: {
            name: '春熙路',
            srot: 9,
            position: [10, 9],
            prev: 'tfgc',
            next: 'dmdq',
        },
        dmdq: {
            name: '东门大桥',
            srot: 9,
            position: [11, 10],
            prev: 'cxl',
            next: 'nwm'
        },
        nwm: {
            name: '牛王庙',
            srot: 11,
            position: [12, 11],
            prev: 'cxl',
            next: 'nwm',
            textAlign: 'end'
        },
        nsk: {
            name: '牛市口',
            srot: 12,
            position: [13, 11],
            prev: 'cxl',
            next: 'nwm',
            textBaseline: 'top',
            offset: [0, 10]
        },
        ddl: {
            name: '东大陆',
            srot: 13,
            position: [14, 11],
            prev: 'cxl',
            next: 'nwm'
        },
        tzsgy: {
            name: '塔子山公园',
            srot: 14,
            position: [15, 12],
            prev: 'cxl',
            next: 'nwm',
            textAlign: 'end'
        },
        cddkz: {
            name: '成都东客站',
            srot: 15,
            position: [16, 13],
            prev: 'cxl',
            next: 'nwm'
        },
        cylj: {
            name: '成渝立交',
            srot: 16,
            position: [17, 14],
            prev: 'cxl',
            next: 'nwm'
        }
    }
}

const line3 = {
    name: '三号线',
    type: 1,
    color: '#ed008c',
    lineColor: '#ff7cc8',
    list: {
        zjsnl: {
            name: '昭觉寺南路',
            srot: 1,
            position: [13, 2],
            prev: null,
            next: 'smq'
        },
        smq: {
            name: '驷马桥',
            srot: 1,
            position: [12, 3],
            prev: null,
            next: 'yptx',
            offset: [0, 16]
        },
        jjt: {
            name: '李家沱',
            srot: 1,
            position: [12, 4],
            prev: null,
            next: 'yptx'
        },
        qfl: {
            name: '前锋路',
            srot: 1,
            position: [12, 5],
            prev: null,
            next: 'yptx'
        },
        hxl: {
            name: '红星路',
            srot: 1,
            position: [12, 6],
            prev: null,
            next: 'yptx'
        },
        seyy: {
            name: '市二医院',
            srot: 1,
            position: [12, 7],
            prev: null,
            next: 'yptx'
        },
        cxl: {
            name: '春熙路',
            srot: 1,
            position: [10, 9],
            prev: null,
            next: 'yptx'
        },
        xnm: {
            name: '新南门',
            srot: 1,
            position: [10, 11],
            prev: null,
            next: 'yptx'
        },
        mzq: {
            name: '磨子桥',
            srot: 1,
            position: [10, 12],
            prev: null,
            next: 'yptx'
        },
        styg: {
            name: '省体育馆',
            srot: 1,
            position: [9, 13],
            prev: null,
            next: 'yptx'
        },
        ygm: {
            name: '衣冠庙',
            srot: 1,
            position: [7, 13],
            prev: null,
            next: 'yptx',
            offset: [0, 14]
        },
        gsq: {
            name: '高升桥',
            srot: 1,
            position: [4, 13],
            prev: null,
            next: 'yptx',
            offset: [0, 14]
        },
        hpl: {
            name: '红牌楼',
            srot: 1,
            position: [3, 14],
            prev: null,
            next: 'yptx'
        },
        tpy: {
            name: '太平园',
            srot: 1,
            position: [2, 16],
            prev: null,
            next: 'yptx'
        },
        zj: {
            name: '族锦',
            srot: 1,
            position: [1, 17],
            prev: null,
            next: 'yptx'
        },
    }
}

const line4 = {
    name: '四号线',
    type: 1,
    color: '#01ab53',
    lineColor: '#9affcb',
    list: {
        qjxl: {
            name: '清江西路',
            position: [1, 6],
            offset: [0, 16]
        },
        whg: {
            name: '文化宫',
            position: [2, 6],
            offset: [0, 16]
        },
        xncd: {
            name: '西南财大',
            position: [4, 6],
            offset: [0, 16]
        },
        ctbl: {
            name: '草堂北路',
            position: [5, 6],
            offset: [0, 16]
        },
        zydsyy: {
            name: '中医大省医院',
            position: [7, 6],
        },
        kzxz: {
            name: '宽窄巷子',
            position: [8, 6],
            offset: [0, 16],
            textAlign: 'end'
        },
        lms: {
            name: '骡马市',
            position: [9, 6],
        },
        tsnl: {
            name: '太升南路',
            position: [10, 6],
        },
        seyy: {
            name: '市二医院',
            position: [12, 7],
        },
        ysl: {
            name: '玉双路',
            position: [13, 8],
            offset: [0, 16]
        },
        sql: {
            name: '双桥路',
            position: [14, 8],
            offset: [0, 16]
        },
        wnc: {
            name: '万年场',
            position: [15, 8],
            offset: [0, 16]
        },
        hsz: {
            name: '槐树站',
            position: [16, 8],
            offset: [0, 16]
        },
        ll: {
            name: '来龙',
            position: [17, 8],
            offset: [0, 16]
        }
    }
}

const line7 = {
    type: 0,
    name: '7号线',
    color: '#88d4e4',
    lineColor: '#c1f2fc',
    list: {
        hcbz: {
            name: '火车北站',
            position: [9, 3],
        },
        smq: {
            name: '驷马桥',
            position: [12, 3],
        },
        fql: {
            name: '府青路',
            position: [14, 3],
            offset: [0, 16]
        },
        bzl: {
            name: '八庄里',
            position: [16, 3],
        },
        sdl: {
            name: '双电路',
            position: [16, 7],
        },
        hsz: {
            name: '槐树站',
            position: [16, 8],
        },
        yhl: {
            name: '迎辉路',
            position: [16, 12],
        },
        cddkz: {
            name: '成都东客站',
            position: [16, 13],
        },
        dg: {
            name: '大观',
            position: [16, 16],
        },
        swy: {
            name: '三瓦窑',
            position: [10, 16],
            offset: [0, -16]
        },
        hcnz: {
            name: '火车南站',
            position: [9, 16],
        },
        sxs: {
            name: '神仙树',
            position: [8, 16],
            offset: [0, -16]
        },
        tpy: {
            name: '太平园',
            position: [2, 16],
        },
        dpl: {
            name: '东坡路',
            position: [2, 7],
        },
        whg: {
            name: '文化宫',
            position: [2, 6],
        },
        jsbwg: {
            name: '金沙博物馆',
            position: [2, 4],
        },
        yptx: {
            name: '一品天下',
            position: [3, 3]
        },
        xnjd: {
            name: '西南交大',
            position: [6, 3],
            offset: [0, 16]
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