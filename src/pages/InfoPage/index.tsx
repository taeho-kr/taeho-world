import Expertise from './components/Expertise';
import SNSArea from './components/SNSArea';

const InfoPage = () => {
	return (
		<div className='w-full h-full flex flex-col justify-center items-center gap-6 py-5'>
			<Expertise />
			<SNSArea />
		</div>
	);
};

export default InfoPage;
