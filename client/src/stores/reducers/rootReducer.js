import { useState, useEffect } from "react";
import seriesFiml from '../../datas/seriesFiml/seriesFiml.json'
import oddFiml from '../../datas/oddFiml/oddFiml.json'
import shows from '../../datas/shows/shows.json'
import cartoon from '../../datas/cartoon/cartoon.json'
import banner from '../../datas/banner/banner.json'

import truonghanhca from '../../assets/images/truonghanhca.jpg'
import ngocrong from '../../assets/images/7vienngocrong.jpg'
import chienbinhmuadong from '../../assets/images/chienbinhmuadong.jpg'
import chuatechiecnhan from '../../assets/images/chuatechiecnhan.jpg'
import kingsman from '../../assets/images/kingsman.jpg'
import loki1 from '../../assets/images/loki1.jpg'
import minhlan from '../../assets/images/minhlan.jpg'
import trutien2 from '../../assets/images/trutien2.jpg'
import thieunien from '../../assets/images/thieunientudaidanhbo.jpg'

const initState = {
    seriesFiml: [

    ],
    oddFiml: [

    ],
    shows: [

    ],
    cartoon: [

    ],
    banner: [

    ],
    listBanner : [
        { id: "627212013a2c0c6289bb9cd7", url: truonghanhca, slug: "truong-ca-hanh" },
        { id: "627355803a2c0c6289bc6e7c", url: ngocrong, slug: "bay-vien-ngoc-rong-z" },
        { id: "62695c78fa02df5563cbeccb", url: chienbinhmuadong, slug: "falcon-va-chien-binh-mua-dong" },
        { id: "6262eaf9db43524328b0fc26", url: chuatechiecnhan, slug: "chua-te-cua-chiec-nhan-su-tro-ve-cua-nha-vua" },
        { id: "6266d1ad489068f643a21e09", url: kingsman, slug: "mat-vu-kingsman-kingsman-the-secret-service" },
        { id: "62700f343a2c0c6289b9e435", url: loki1, slug: "loki" },
        { id: "6269e1b7fa02df5563cc2fa6", url: minhlan, slug: "minh-lan-truyen" },
        { id: "626ab730fa02df5563cc9b2a", url: trutien2, slug: "tru-tien-thanh-van-chi-2" },
        { id: "626fc4263a2c0c6289b9bb8e", url: thieunien, slug: "thieu-nien-tu-dai-danh-bo" },
    ],
    totalphim: [

    ],
    fimlCurrent: [

    ],
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CALL_API':
            seriesFiml.map((item, index) => {
                state.seriesFiml.push(item)
                state.totalphim.push(item)
            })

            oddFiml.map((item, index) => {
                state.totalphim.push(item)
                state.oddFiml.push(item)

            })

            shows.map((item, index) => {
                state.shows.push(item)
                state.totalphim.push(item)
            })

            cartoon.map((item, index) => {
                state.cartoon.push(item)
                state.totalphim.push(item)
            })

            banner.map((item, index) => {
                state.banner.push(item)
                state.totalphim.push(item)
            })
            // console.log("Check phim bo:", state.seriesFiml)
            return state
        case "EPISODE_CURRENT":
            const current = []
            state.fimlCurrent = current
            state.fimlCurrent = action.payload
            // console.log("fimlCurrent", state.fimlCurrent)
            return state
        default:
            return state;
    }
}

export default rootReducer;