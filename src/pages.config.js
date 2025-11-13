import Home from './pages/Home';
import MemeMode from './pages/MemeMode';
import VideoVortex from './pages/VideoVortex';
import TweetTempest from './pages/TweetTempest';
import OfficeInferno from './pages/OfficeInferno';
import WellnessWhirlwind from './pages/WellnessWhirlwind';
import SisterhoodSummit from './pages/SisterhoodSummit';
import Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "MemeMode": MemeMode,
    "VideoVortex": VideoVortex,
    "TweetTempest": TweetTempest,
    "OfficeInferno": OfficeInferno,
    "WellnessWhirlwind": WellnessWhirlwind,
    "SisterhoodSummit": SisterhoodSummit,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: Layout,
};