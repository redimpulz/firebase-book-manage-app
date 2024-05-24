'use client';
import { isLogin, logoutUser } from "@/firebase/authentication";
export default function LogoutButton() {
    if (!isLogin()) {
        return '';
    }
    return (
    <button
    onClick={() => logoutUser()}
    className="text-lg sm:text-2xl p-2"
  >
    ログアウト
    </button>);
}