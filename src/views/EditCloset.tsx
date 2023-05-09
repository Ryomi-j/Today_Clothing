import { Link } from "react-router-dom";
import { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { useRecoilValue } from "recoil";
import { userInfo } from "../store/user";
import { v4 } from "uuid";

export const EditCloset = () => {
	const [imgUpload, setImgUpload] = useState<undefined | File>(undefined);
	const userUid = useRecoilValue(userInfo).uid;
	console.log(userUid);

	const uploadImg = () => {
		if (!imgUpload) return;
		const imgRef = ref(storage, `imgs/${userUid + imgUpload.name + v4()}`);
		uploadBytes(imgRef, imgUpload).then(() => {
			alert("img uploaded");
		});
	};

	return (
		<div className="flex min-h-[calc(100vh-3.3rem)] pt-16 bg-base-200">
			<div className="card gap-5 my-6 mx-auto py-7 px-14 bg-base-100 shadow-xl">
				<h2 className="text-4xl font-extrabold text-center pt-5 pb-5">Edit Weekly Closet</h2>
				<figure className="w-96 h-96 m-auto border-2 rounded-md cursor-pointer">
					<label className="w-1/3 h-1/3 bg-[url('/public/addImg.svg')] bg-no-repeat bg-center bg-contain ">
						<input
							type="file"
							className="hidden"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								const file = e.target.files?.[0];
								if (file) {
									setImgUpload(file);
								}
							}}
						/>
					</label>
				</figure>
				<div className="card-body max-h-fit">
					<h3 className=" mb-14 text-3xl font-semibold text-center">Tue</h3>
					<div className="flex justify-end gap-2">
						<label htmlFor="my-modal-6" className="btn btn-primary" onClick={uploadImg}>
							Save
						</label>
						<Link to="/closet">
							<button className="btn">Cancel</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
