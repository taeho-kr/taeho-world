import styled from 'styled-components';
import Navigation from './components/Navigation';
import { columnBox } from './styles';
import { Route, Routes } from 'react-router-dom';
import ContentsArea from './components/ContentsArea';
import MainPage from './pages/MainPage';
import StoryPage from './pages/StoryPage';
import { useEffect } from 'react';
import { users } from './data/users';
import { useSetRecoilState } from 'recoil';
import { UsersAtom } from './store/user';
import ExplorerPage from './pages/ExplorerPage';

function App() {
	const setUsers = useSetRecoilState(UsersAtom);

	useEffect(() => {
		getUsersData();
	}, []);

	const getUsersData = () => {
		setUsers(users);
	};

	return (
		<AppContainer>
			{/* <LocationArea /> */}
			<ContentsArea>
				<Routes>
					<Route
						path='/'
						element={<MainPage />}
					/>
					<Route
						path='/explorer'
						element={<ExplorerPage />}
					/>
				</Routes>
			</ContentsArea>
			<Navigation />
			<StoryPage />
		</AppContainer>
	);
}

const AppContainer = styled.div`
	${columnBox};
	background-color: black;
	position: relative;
	min-width: 360px;
	width: 100vw;
	max-width: 600px;
	height: 100vh;
`;

export default App;
