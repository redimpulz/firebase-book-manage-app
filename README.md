# firebase-book-manage-app

firebase-book-manage-appは
自宅やサークルの部室、研究室などの蔵書が管理できるWebアプリです！
Next.jsとfirebaseで作成しています。

## 機能一覧

- 蔵書一覧
- 蔵書詳細
- ログイン・ログアウト
- 会員登録
- 蔵書追加
- 蔵書編集
- 蔵書削除

## 仕様技術

- TypeScript
- React / Next.js
- Firebase
    - Cloud Firestore
    - Authentication
    - Cloud Storage for Firebase
- Tailwind CSS
- Vercel

## 開発のススメ

はじめに、`.env`ファイルを`.env.local`ファイルとしてコピーし、`.env.local`にfirebase configを設定します．

```sh
cp .env .env.local
```

```dotenv:.env.local
FIREBASE_API_KEY=YourFirebaseAPIkey
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_AUTH_DOMAIN=your-firebase-project-id.firebaseapp.com
FIREBASE_STORAGE_BUCKET=your-firebase-project-id.appspot.com
FIREBASE_APP_ID=your:firebase:app:id
```

次に、firebaseのエミュレータを起動します．

```bash
npm run dev:firebase
# or
yarn dev:firebase
# or
pnpm dev:firebase
# or
bun dev:firebase
```

Third, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
