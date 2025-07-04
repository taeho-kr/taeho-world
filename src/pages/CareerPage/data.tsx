import { Company, Project } from '@/types';
import Text from '@/components/myUI/text';
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

const projects: Project[] = [
	{
		id: 1,
		company: 1,
		name: 'StyleAR',
		domains: ['AI', 'E-Commerce', 'Beauty'],
		start: '2020-02',
		end: '2021-06',
		url: 'https://www.stylear.ai/',
		images: [styleAR2Image, styleARImage],
		singleSentence: 'AR Virtual Try-On for E-Commerce',
		description: (
			<Text size='caption'>
				StyleAR enables customers to virtually try on jewelry, clothing, and beauty products using augmented
				reality (AR) technology. Seamlessly integrated with client websites, including platforms like Cafe24, it
				offers customizable interfaces to align with brand themes. The solution enhances customer engagement
				through QR code distribution across online and offline channels, driving interaction and retention.
				Available on iOS, Android, Windows, and devices such as smartphones, kiosks, and smart mirrors, StyleAR
				streamlines the shopping experience and boosts customer satisfaction.
			</Text>
		),
		techStack: ['Vue2', 'Vuex', 'HTML Canvas', 'WebGL', 'JQuery', 'Node.js', 'Express', 'MySQL'],
	},
	{
		id: 2,
		company: 2,
		name: 'HyperChatbot',
		domains: ['AI', 'E-Commerce', 'Beauty'],
		start: '2021-07',
		end: '2022-12',
		url: 'https://www.tmax.co.kr/hyperchatbot',
		images: [manyChatImage],
		singleSentence: 'Personalized AI Chatbot',
		description: (
			<Text size='caption'>
				HyperChatbot blends AI and rule-based methods for tailored conversational responses.
				<br />
				HyperChatbot is a web-based chatbot that combines AI with rule-based approaches, leveraging natural
				language processing and a knowledge graph to deliver personalized consultations. By adapting response
				formats to situational rules, it enhances user engagement across various applications.
			</Text>
		),
		techStack: ['React', 'Redux', 'Styled-Components'],
	},
	{
		id: 3,
		company: 2,
		name: 'Research Information Sharing Service (RISS)',
		domains: ['AI', 'Academic'],
		start: '2021-12',
		end: '2022-12',
		url: 'https://www.riss.kr/',
		images: [RISSImage],
		singleSentence: 'AI-Powered Academic Search',
		description: (
			<Text size='caption'>
				RISS uses AI to search and share university academic papers publicly.
				<br />
				RISS is a nationwide platform leveraging AI-based technology to provide efficient access to academic
				papers from university resources. Openly accessible to the public, it fosters research collaboration and
				strengthens national competitiveness by centralizing scholarly materials and supporting next-generation
				industries.
			</Text>
		),
		techStack: ['React', 'Recoil', 'Styled-Components'],
	},
	{
		id: 4,
		company: 3,
		name: 'Smart City Total Management System',
		domains: ['Geographic', 'Physical security', 'Video Stream'],
		start: '2023-04',
		end: '2024-06',
		images: [TMSImage, TMS2Image, TMS3Image],
		videoUrl: 'https://www.youtube.com/watch?v=uvrNgaAT7wM',
		singleSentence: 'AI-Driven Urban Safety',
		description: (
			<Text size='caption'>
				This system integrates AI and video analysis for comprehensive urban disaster management.
				<br />
				The Smart City Total Management System unifies disparate information systems into a tailored disaster
				safety framework using AI and video stream analysis. It enables real-time sharing of location data and
				CCTV footage during emergencies, optimizing response strategies, and supports proactive disaster
				prevention through big data analysis.
			</Text>
		),
		techStack: ['Angular', 'SCSS', 'OpenLayers', 'React', 'Recoil', 'Styled-Components'],
	},
	{
		id: 5,
		company: 3,
		name: 'AI Camera',
		domains: ['AI', 'Video Stream'],
		start: '2023-06',
		end: '2024-11',
		images: [aiCamImage, aiCam2Image, aiCam3Image],
		singleSentence: 'Edge-Based Video Analysis',
		description: (
			<Text size='caption'>
				VUNex AI processes video on edge devices for efficient multi-camera security management.
				<br />
				VUNex AI uses distributed processing to analyze video directly on edge devices, eliminating reliance on
				central servers. By configuring AI sensitivity, regions of interest, schedules, and models on each
				camera, it operates independently, reducing latency and enhancing security for small business
				applications.
			</Text>
		),
		techStack: ['React', 'Recoil', 'Styled-Components'],
	},
	{
		id: 6,
		company: 3,
		name: 'VUNex AI',
		domains: ['AI', 'Video Stream', 'Physical Security'],
		start: '2024-10',
		images: [vunexAIImage, vunexAI2Image],
		singleSentence: 'Security for Small Businesses',
		description: (
			<Text size='caption'>
				VUNex AI delivers AI-powered video security for small businesses, detecting incidents and behaviors.
				<br />
				Tailored for small businesses, VUNex AI uses AI and video stream analysis to detect intrusions, falls,
				fires, and abnormal behaviors. Unlike solutions for large enterprises, it’s designed for settings like
				factories, stores, and offices, offering a cost-effective, scalable way to enhance safety and protect
				assets.
			</Text>
		),
		techStack: ['React', 'Zustand', 'tanstack Query', 'Styled-Components', 'tailwindcss', 'WebRTC', 'HTML Canvas'],
	},
	{
		id: 7,
		company: 3,
		name: 'VUNex MLOps',
		domains: ['AI', 'MLOps'],
		start: '2024-10',
		url: 'https://mlops.vunex-cloud.com/',
		images: [vunexMLOpsImage, vunexMLOps2Image, vunexMLOps3Image],
		singleSentence: 'Video Data Labeling Solution',
		description: (
			<Text size='caption'>
				VUNex MLOps enables efficient video data labeling for AI model training, unlike image-based tools.
				<br />
				Unlike traditional labeling tools designed for images, VUNex MLOps streamlines video data annotation for
				AI model training. For a 10-second video at 30 fps, containing 300 frames, labeling each frame
				individually is time-consuming. With VUNex MLOps, users label the video once, automatically applying
				consistent annotations across all frames, saving time and ensuring accuracy for small business AI
				applications.
			</Text>
		),
		techStack: ['React', 'Zustand', 'tanstack Query', 'tailwindcss', 'HTML Canvas'],
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
];

export { projects, company };
