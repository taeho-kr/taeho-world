import { Company, Project } from '@/types';
import Text from '@/components/myUI/text';
import Spacing from '@/components/myUI/spaing';
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
		singleSentence: 'AR virtual try-on solution for jewelry, beauty, and fashion e-commerce.',
		description: (
			<Text size='caption'>
				Enables customers to virtually try on products like jewelry and clothing through AR technology. It
				integrates seamlessly with clients websites and supports platforms like Cafe24, customizable to match
				brand themes. The solution enhances customer engagement by offering QR code distribution across online
				and offline channels. It is available on iOS, Android, Windows, and devices like smartphones, kiosks,
				and smart mirrors. StyleAR aims to boost retention and streamline the shopping experience.
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
		singleSentence: 'A chatbot combining AI and rule-based approaches.',
		description: (
			<Text size='caption'>
				A web application chatbot that provides personalized responses based on a knowledge graph, leveraging
				natural language processing (NLP) results. It can deliver tailored consultations by setting response
				formats according to situational rules.
			</Text>
		),
		techStack: ['React', 'Redux', 'Styled-Components'],
	},
	{
		id: 3,
		company: 2,
		name: 'Research Information Sharing Service',
		domains: ['AI', 'Academic'],
		start: '2021-12',
		end: '2022-12',
		url: 'https://www.riss.kr/',
		images: [RISSImage],
		singleSentence: 'A service for searching a list of academic papers using AI-based technology.',
		description: (
			<Text size='caption'>
				RISS is a nationwide service that enables the shared use of academic resources produced, held, and
				subscribed to by universities across the country, openly accessible to the public.
				<br />
				Strengthening national research competitiveness by establishing a shared national academic research
				information system. Enhancing next-generation industrial momentum through the development of human
				resources.
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
		singleSentence: 'Total management system based on AI and video stream analysis.',
		description: (
			<Text size='caption'>
				Introduced to address urban issues, this service integrates previously disconnected, individually
				operated information systems to establish a comprehensive disaster safety framework tailored to
				geographical and environmental characteristics.
				<Spacing size={16} />
				In emergencies, real-time information sharing (e.g., location, CCTV footage) with relevant agencies
				secures golden time, proposing efficient operational strategies. Additionally, it supports the
				development of preventive disaster safety systems through big data collection and analysis.
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
		singleSentence: 'AI-based camera firmware.',
		description: (
			<Text size='caption'>
				To manage multiple cameras, instead of collecting and analyzing all footage on a central server,
				distributed processing is used where AI analysis is performed directly on edge devices. By setting the
				AI sensitivity, ROI, schedule, and model files on the edge device, the camera can operate as a
				standalone type.
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
		singleSentence: 'Physical security solution for small business.',
		description: (
			<Text size='caption'>
				Physical security solution based on AI and video stream analysis for small business.
				<br /> Most of physical security solutions are designed for large business. But in the real world, many
				small business are using physical security solution. VUNex AI can provide security for small business.
				<Spacing size={16} />
				It provides a service to detect intrusion, falldown, and fire, etc. It also provides a service to detect
				the abnormal behavior of people. It can be used in various places such as factories, stores, and
				offices.
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
		singleSentence: 'Label your data on video, not on image.',
		description: (
			<Text size='caption'>
				Most of common labeling tools are designed for image data.
				<br /> But in the real world, most of data is video. VUNex MLOps provides a tool to label your data on
				video, not on image. You can label your data on video, and you can use it for your AI model training.
				<Spacing size={16} />
				Imagine you have a video with 10 seconds, and the video has 30 fps. You can get 300 images from the
				video. That means you have to label 300 images. But if you use VUNex MLOps, you can label the video, and
				you can get. Now you can label object just once, and you can get same labeling result for 300 images.
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
