📌 **Feedback on To-Do Application**

## Part 2

🔸 **Issue 1:**
Was not maintaining dev and prod dependencies properly in `package.json` as I suggested! (but I fixed it again) 📦

🔸 **Issue 2:**
Updated the `content` prop of tailwind config to scan for all `.ts` and `.tsx` files. 📄

🔸 **Issue 3:**
Updated `index.css` with tailwind base rules and imported those rules in the application via `index.tsx` file import! 💅

🔸 **Issue 4:**
Commented styles for the `Title` in `App.css` and rewrote that CSS directly inside `TitleHeader.tsx` to check if tailwind is being applied properly! 💻

🔸 **Issue 5:**
Finally, in `index.tsx`, also fixed the console warning in the browser to render the page using the old way (`.render`) rather than using the latest and faster trend of React 18 (`.createRoot`) in `index.css` for faster reload and no warning! ⚡️

**Part1**

👉 **Point 0:**
Normally, thunk is something I don't expect beginners to implement in their first go! I would recommend adding it later. But since you have added it, great! However, unfortunately, as a beginner, you have made a lot of mistakes. I have fixed your thunk errors and referred to the official documentation to do so. Hope you will understand. Nice effort, by the way! HappyCoding! 😊

👉 **Point 1:**
Please use more readable variables compared to `i`, `j`, `t`, etc. It's bad practice and makes it tough to debug code. I have fixed it in this branch, so please try to follow it! 👍

👉 **Point 2:**
Please try to break your `App.tsx` into a folder called `Components`. It's a bad practice to include all the HTML in a single `App` component. It becomes hard to manage and violates the DRY principle. (I have left that for you to do!) 😉

👉 **Point 3:**
Please beware of dev and prod dependencies in your project. You don't want to make your React project bulky by including dev dependencies that you don't need in production. Please follow the way I maintained the dependencies in `package.json` (I have edited it now!) 📦

👉 **Point 4:**
Please try to code by commenting, as I did. Your code didn't have a single line of comment except some issue highlighting! 🤔
