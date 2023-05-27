import { useRef, useState } from "react";
import { isDuplicateId, isDuplicateNickName, logout, signUp } from "../firebase";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
	const idInput = useRef<HTMLInputElement>(null);
	const pwInput = useRef<HTMLInputElement>(null);
	const nicknameInput = useRef<HTMLInputElement>(null);
	const confirmPw = useRef<HTMLInputElement>(null);
	const [id, setId] = useState("");
	const [isIdDuplicate, setIsIdDuplicate] = useState(false);
	const [nickName, setNickName] = useState("");
	const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false);
	const nav = useNavigate();

	const isValidId = (id: string): boolean => {
		const validId = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,12}$/;
		return validId.test(id);
	  };	  

	const isValidPassword = (password: string): boolean => {
		const validPassword = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,12}$/;
		console.log(validPassword.test(password))
		return validPassword.test(password);
	};

	const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setId(event.target.value);
		setIsIdDuplicate(false);
	};

	const handleNickNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNickName(event.target.value);
	};

	const isValidNickname = async () => {
		const result = await isDuplicateNickName(nickName);
		if (result) {
			alert("이미 사용중인 닉네임입니다.");
		} else {
			alert("사용가능한 닉네임입니다.");
			setIsNicknameDuplicate(true);
		}
	};

	const checkId = async () => {
		if (!isValidId(id)) {
			alert("영문/숫자 조합 6~12자리의 id를 입력해주세요");
		} else {
			const result = await isDuplicateId(id + "@todayclothing.com");
			if (result) {
				alert("이미 사용중인 ID입니다.");
			} else {
				alert("사용가능한 ID 입니다.");
				setIsIdDuplicate(true);
			}
		}
	};

	const handleJoin = () => {
		const email = id + "@todayClothing.com" ?? "";
		let pw = pwInput?.current?.value ?? "";
		let _pw = confirmPw?.current?.value ?? "";
		let nickname = nicknameInput?.current?.value;

		if (!isIdDuplicate) return alert("아이디 중복검사가 필요합니다.");
		else if (!isValidPassword(pw)) {
			alert("영문/숫자 조합 6~12자리의 password를 입력해주세요.");
		} else if (pw !== _pw) {
			alert("password가 일치하지 않습니다.");
		} else if (!nickname) {
			alert("닉네임을 입력하세요");
		} else if (!isNicknameDuplicate) {
			alert("닉네임 중복검사가 필요합니다.");
		} else {
			signUp(email, pw, nickname);
			alert("축하합니다. 가입이 완료되었습니다. 로그인 페이지로 이동합니다. :)");
			logout()
			nav("/login");
		}
	};

	return (
		<>
			<div className="hero min-h-[calc(100vh-3.3rem)] pt-16 bg-base-200">
				<div className="card flex-shrink-0 shadow-2xl bg-base-100">
					<div className="card-body pl-6 pr-1 sm:p-5 lg:p-10 gap-0 lg:gap-5 w-52 xs:w-auto">
						<h2 className="text-center text-xl xs:text-4xl md:text-5xl font-bold">Sign Up</h2>
						<div className="form-control sm:flex-row sm:justify-center sm:items-center mt-1 sm:mt-4 xs:mt-8 md:mt-16 ">
							<label htmlFor="nickName" className="label w-24 sm:justify-end">
								<span className="label-text pr-3 font-bold">Nickname</span>
							</label>
							<div className="flex">
								<input
									type="text"
									id="nickName"
									placeholder="Nickname"
									minLength={1}
									maxLength={15}
									ref={nicknameInput}
									className="input input-bordered w-36 h-8 xs:w-52 sm:h-12 md:auto"
									onChange={handleNickNameChange}
								/>
								<button
									className="btn btn-xs text-[8px] xs:btn-sm sm:btn-md p-1 md:flex-col text-xs ml-1"
									onClick={isValidNickname}
								>
									<p>Check</p>
									<p className="hidden md:block">Availability</p>
								</button>
							</div>
						</div>
						<div className="form-control sm:flex-row sm:justify-center sm:items-center mt-1 sm:mt-4 xs:mt-8 ">
							<label htmlFor="nickName" className="label w-24 sm:justify-end">
								<span className="label-text pr-3 font-bold">ID</span>
							</label>
							<div className="flex">
								<input
									type="text"
									id="id"
									placeholder="영문/숫자 조합 6~12자리"
									minLength={6}
									maxLength={12}
									ref={idInput}
									className="input input-bordered w-36 h-8 xs:w-52 sm:h-12 md:auto"
									onChange={handleIdChange}
								/>
								<button
									className="btn btn-xs text-[8px] xs:btn-sm sm:btn-md p-1 md:flex-col text-xs ml-1"
									onClick={checkId}
								>
									<p>Check</p>
									<p className="hidden md:block">Availability</p>
								</button>
							</div>
						</div>
						<div className="form-control sm:flex-row sm:justify-center sm:items-center mt-1 sm:mt-4 xs:mt-8 mr-20 md:mr-32">
							<label htmlFor="nickName" className="label w-24 sm:justify-end">
								<span className="label-text pr-3 font-bold">PW</span>
							</label>
							<input
								type="password"
								id="pw"
								placeholder="영문/숫자 조합 6~12자리"
								minLength={6}
								maxLength={15}
								ref={pwInput}
								className="input input-bordered w-36 h-8 xs:w-52 sm:h-12"
							/>
						</div>
						<div className="form-control sm:flex-row sm:justify-center sm:items-center mt-1 sm:mt-4 xs:mt-8 mr-20 md:mr-32">
							<label htmlFor="nickName" className="label w-24 sm:justify-end">
								<span className="label-text font-bold">Confrim PW</span>
							</label>
							<input
								type="password"
								id="confirmPw"
								placeholder="password 재확인"
								minLength={6}
								maxLength={15}
								className="input input-bordered w-36 h-8 xs:w-52 sm:h-12 md:auto"
								ref={confirmPw}
							/>
						</div>
						<div className="form-control mt-6">
							<label
								htmlFor="my-modal-6"
								className="btn btn-primary w-1/3 m-auto btn-sm text-xs xs:btn-md"
								onClick={handleJoin}
							>
								Join
							</label>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
