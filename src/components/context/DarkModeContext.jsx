import { createContext, useState, useContext, useEffect } from "react";

export const DarkModeContext = createContext();
//데이터를 콘텍스트에 담고 있음(컴포넌트처럼 쓰임)

//데이터를 가지고 보여주고 있는 우산역할(부모 우산 컴포넌트)
export function DarkModeProvider({ children }) {
	const [darkMode, setDarkMode] = useState(false);
	//다크모드인지 아닌지 기억하는 상태/ 초기값은 다크모드가 아닌 상태
	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
		updateDarkMode(!darkMode);
	};

	// https://tailwindcss.com > docs > darkmode 중간에 있는 상태유지 부분에서 복사
	// 제일 처음 마운트(로딩) 될때 최종 상태가 다크모드인지 아닌지 판단하고 그대로 초기값 설정
	useEffect(() => {
		const isDark =
			localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
		// 다크모드상태를 변수를 isDark에 넣어줌
		setDarkMode(isDark);	// 다크모드인지 아닌지 내부상태 업데이트
		updateDarkMode(isDark);
	}, [])	// 처음 로딩될때만 작동함


	// if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
	// 	document.documentElement.classList.add('dark')
	// } else {
	// 	document.documentElement.classList.remove('dark')
	// }

	return (
		<DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
}

// Hooks 생성
export const useDarkMode = () => useContext(DarkModeContext);

// 다크모드가 트루였을때 제일 상위 엘리면트에 dark 클라스를 넣어준다
function updateDarkMode(darkMode) {
	if (darkMode) {
		document.documentElement.classList.add("dark");
		localStorage.theme = "dark"; //업데이트 될때마다 로컬 스토리지에 저장
	} else {
		document.documentElement.classList.remove("dark");
		localStorage.theme = "light";
	}
}
