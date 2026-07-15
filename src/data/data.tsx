import { Company, Project } from '@/types';
import styleARImage from './images/stylear.webp';
import styleAR2Image from './images/stylear2.webp';
import vunexMLOpsImage from './images/mlops.webp';
import vunexMLOps2Image from './images/mlops2.webp';
import vunexMLOps3Image from './images/mlops3.webp';
import vunexAIImage from './images/vunexai.webp';
import vunexAI2Image from './images/vunexai2.webp';
import aiCamImage from './images/aicam.webp';
import aiCam2Image from './images/aicam2.webp';
import aiCam3Image from './images/aicam3.webp';
import TMSImage from './images/tms.webp';
import TMS2Image from './images/tms2.webp';
import TMS3Image from './images/tms3.webp';
import RISSImage from './images/riss.webp';
import manyChatImage from './images/manychat.webp';
import saipImage from './images/saip.webp';
import saip2Image from './images/saip2.webp';
import saip3Image from './images/saip3.webp';
import saip4Image from './images/saip4.webp';

const projects: Project[] = [
	{
		id: 1,
		company: 1,
		translationKey: 'styleAR',
		domains: ['AI', 'E-Commerce', 'Beauty'],
		start: '2020-02',
		end: '2021-06',
		url: 'https://www.stylear.ai/',
		images: [styleAR2Image, styleARImage],
		techStack: ['Vue2', 'Vuex', 'HTML Canvas', 'WebGL', 'jQuery', 'Node.js', 'Express', 'MySQL'],
	},
	{
		id: 2,
		company: 2,
		translationKey: 'hyperChatbot',
		domains: ['AI', 'E-Commerce', 'Beauty'],
		start: '2021-07',
		end: '2022-12',
		url: 'https://www.tmax.co.kr/hyperchatbot',
		images: [manyChatImage],
		techStack: ['React', 'Redux', 'Styled-Components'],
	},
	{
		id: 3,
		company: 2,
		translationKey: 'riss',
		domains: ['AI', 'Academic'],
		start: '2021-12',
		end: '2022-12',
		url: 'https://www.riss.kr/',
		images: [RISSImage],
		techStack: ['React', 'Recoil', 'Styled-Components'],
	},
	{
		id: 4,
		company: 3,
		translationKey: 'smartCity',
		domains: ['Geographic', 'Physical Security', 'Video Stream'],
		start: '2023-04',
		end: '2024-06',
		images: [TMSImage, TMS2Image, TMS3Image],
		videoUrl: 'https://www.youtube.com/watch?v=uvrNgaAT7wM',
		techStack: ['Angular', 'SCSS', 'OpenLayers', 'React', 'Recoil', 'Styled-Components'],
	},
	{
		id: 5,
		company: 3,
		translationKey: 'aiCamera',
		domains: ['AI', 'Video Stream'],
		start: '2023-06',
		end: '2024-11',
		images: [aiCamImage, aiCam2Image, aiCam3Image],
		techStack: ['React', 'Recoil', 'Styled-Components'],
	},
	{
		id: 6,
		company: 3,
		translationKey: 'vunexAI',
		domains: ['AI', 'Video Stream', 'Physical Security'],
		start: '2024-10',
		images: [vunexAIImage, vunexAI2Image],
		techStack: ['React', 'Zustand', 'TanStack Query', 'Styled-Components', 'Tailwind CSS', 'WebRTC', 'HTML Canvas'],
	},
	{
		id: 7,
		company: 3,
		translationKey: 'vunexMLOps',
		domains: ['AI', 'MLOps'],
		start: '2024-10',
		url: 'https://mlops.vunex-cloud.com/',
		images: [vunexMLOpsImage, vunexMLOps2Image, vunexMLOps3Image],
		techStack: ['React', 'Zustand', 'TanStack Query', 'Tailwind CSS', 'HTML Canvas'],
	},
	{
		id: 8,
		company: 4,
		translationKey: 'saip',
		domains: ['AI', 'Knowledge Graph', 'Ontology'],
		start: '2025-08',
		url: 'https://s2w.inc/ko/product/pd01',
		images: [saipImage, saip2Image, saip3Image, saip4Image],
		techStack: ['Web Frontend', 'Backend', 'Claude Code', 'Codex'],
	},
];

const company: Company[] = [
	{
		id: 1,
		name: 'Deepixel',
		url: 'https://www.deepixel.xyz/',
	},
	{
		id: 2,
		name: 'Tmax AI',
		url: 'https://www.tmax.co.kr/tmaxai',
	},
	{
		id: 3,
		name: 'Innodep Inc.',
		url: 'https://innodep.co.kr/',
	},
	{
		id: 4,
		name: 'S2W',
		url: 'https://s2w.inc/',
	}
];

// 프로젝트 목록을 최근 순으로 정렬 — 진행 중(end 없음)을 가장 최근으로, 그다음 종료일·시작일 내림차순
projects.sort((a, b) => {
	const aEnd = a.end ?? '9999-99';
	const bEnd = b.end ?? '9999-99';
	if (aEnd !== bEnd) return bEnd.localeCompare(aEnd);
	return b.start.localeCompare(a.start);
});

export { projects, company };
