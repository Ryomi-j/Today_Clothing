import { useRef, useState } from "react";
import { Modal } from "../components/common/Modal";
import { signUp } from "../firebase";

export const SignUp = () => {
	const idInput = useRef<HTMLInputElement>(null);
	const pwInput = useRef<HTMLInputElement>(null);
	const confirmPw = useRef<HTMLInputElement>(null);
	const [content, setContent] = useState("");
	const [link, setLink] = useState("");
	const $modal = document.querySelector('input[type="checkbox"]') as HTMLInputElement;

	const handleJoin = () => {
		const id = idInput?.current?.value + "@todayClothing.com" ?? "";
		let pw = pwInput?.current?.value ?? "";
		let _pw = confirmPw?.current?.value ?? "";

		if (id.length < 6) {
			setContent("6자리 이상의 id를 입력해주세요");
			setLink("/sign-up");
		} else if (pw.length < 6) {
			setContent("6자리 이상의 password를 입력해주세요");
			setLink("");
		} else if (pw !== _pw) {
			setContent("password가 일치하지 않습니다.");
			setLink("");
		} else {
			signUp(id, pw);
			setContent("축하합니다. 가입이 완료되었습니다 :)");
			setLink("login");
		}
		$modal.click();
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
							/>
							<button className="btn btn-s p-1 font- text-xs ml-1 ">
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
			<Modal content={content} link={link} btnContent="OK" />
		</>
	);
};
