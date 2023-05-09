import { useRef, useState } from "react";
import { isDuplicateId, signUp } from "../firebase";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
	const idInput = useRef<HTMLInputElement>(null);
	const pwInput = useRef<HTMLInputElement>(null);
	const confirmPw = useRef<HTMLInputElement>(null);
	const [id, setId] = useState("");
	const [isIdDuplicate, setIsIdDuplicate] = useState(false);
	const nav = useNavigate()

	const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setId(event.target.value);
		setIsIdDuplicate(false);
	};

	const checkId = async () => {
		const result = await isDuplicateId(id + "@todayClothing.com");
		if (result) {
			alert("이미 사용중인 ID입니다.");
		} else {
			alert("사용가능한 ID 입니다.");
			setIsIdDuplicate(true);
		}
	};

	const handleJoin = () => {
		const email = id + "@todayClothing.com" ?? "";
		let pw = pwInput?.current?.value ?? "";
		let _pw = confirmPw?.current?.value ?? "";

		if (!isIdDuplicate) return alert("아이디 중복검사가 필요합니다.");
		else if (id.length < 6) {
			alert("6자리 이상의 id를 입력해주세요");
		} else if (pw.length < 6) {
			alert("6자리 이상의 password를 입력해주세요");
		} else if (pw !== _pw) {
			alert("password가 일치하지 않습니다.");
		} else {
			signUp(email, pw);
			alert("축하합니다. 가입이 완료되었습니다 :)");
			nav('/login')
		}
	};

	return (
		<>
			<div className="hero min-h-[calc(100vh-3.3rem)] pt-16 bg-base-200">
				<div className="card flex-shrink-0 shadow-2xl bg-base-100">
					<div className="card-body p-14 gap-5">
						<h2 className="text-center text-5xl font-bold">Sign Up</h2>
						<div className="form-control flex-row  mt-16">
							<label htmlFor="id" className="label w-24 justify-end">
								<span className="label-text pr-3 font-bold">ID</span>
							</label>
							<input
								type="text"
								id="id"
								placeholder="id"
								minLength={6}
								maxLength={15}
								ref={idInput}
								className="input input-bordered w-52"
								onChange={handleIdChange}
							/>
							<button className="btn btn-s p-1 font- text-xs ml-1" onClick={checkId}>
								Check
								<br />
								Availability
							</button>
						</div>
						<div className="form-control  flex-row ">
							<label htmlFor="pw" className="label w-24 justify-end">
								<span className="label-text pr-3 font-bold">PW</span>
							</label>
							<input
								type="text"
								id="pw"
								placeholder="password"
								minLength={6}
								maxLength={15}
								ref={pwInput}
								className="input input-bordered w-52"
							/>
						</div>
						<div className="form-control  flex-row ">
							<label htmlFor="confirmPw" className="label w-24">
								<span className="label-text font-bold">Confrim PW</span>
							</label>
							<input
								type="text"
								id="confirmPw"
								placeholder="password"
								minLength={6}
								maxLength={15}
								className="input input-bordered w-52"
								ref={confirmPw}
							/>
						</div>
						<div className="form-control mt-6">
							<label htmlFor="my-modal-6" className="btn btn-primary w-1/3 m-auto" onClick={handleJoin}>
								Join
							</label>
						</div>
					</div>
				</div>
			</div>
			{/* <Modal content={content} link={link} btnContent="OK" /> */}
		</>
	);
};
