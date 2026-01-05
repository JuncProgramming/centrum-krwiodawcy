# 🩸 Centrum Krwiodawcy

> A comprehensive web app built for honorary blood donors to track donation history, calculate tax reliefs, and precisely plan their next visits to Blood Centers in Poland.

## 🖼️ Project Gallery
<table align="center"> <tr> <td align="center"> <strong>Welcome Screen</strong>
<img src="https://github.com/user-attachments/assets/f95a4402-957d-4ef5-b5f3-633b52271992" alt="FAQ section for donors" width="300"/> </td> <td align="center"> <strong>Donation Date Calculator</strong>
<img src="https://github.com/user-attachments/assets/01bf8054-159f-4fb8-b686-fe7b3b06e3a7" alt="Hero section with call to action" width="300"/> </td> <td align="center"> <strong>FAQ & Guides</strong>
<img src="https://github.com/user-attachments/assets/555400b5-4152-4df3-9a62-fd54c32e4d0b" alt="Calculated date for next donation" width="300"/> </td> </tr> <tr> <td align="center"> <strong>Dashboard Donation Status & History</strong>
<img src="https://github.com/user-attachments/assets/2243e001-9362-4847-8b3a-2e5b41ffca83" alt="Dashboard showing status and stats" width="300"/> </td> <td align="center"> <strong>Dashboard Statistics & Tax Relief Calculator</strong>
<img src="https://github.com/user-attachments/assets/a1bfdd96-85b5-4662-843d-c9f9ada4cdda" alt="Donation history and tax calculator" width="300"/> </td> <td align="center">  </td> </tr> </table>

---

## 🚀 Key Features

* **Donation History Management**: Log different types of donations including Whole Blood, Plasma, and Platelets. 
* **Detailed Records**: Track specific volumes, dates, and RCKiK locations for every entry.
* **Smart Next Donation Calculator**: Automatically determines the earliest possible date for the next visit based on Polish legal intervals and user gender.
* **Tax Relief Estimator**: A dedicated tool to calculate the deductible tax amount based on total donation volume for the chosen tax year.
* **Achievement & Badge System**: Visualizes progress toward becoming a "Meritorious Blood Donor" (Zasłużony Honorowy Dawca Krwi) through various ranks.
* **Impact Statistics**: Displays motivational stats such as total liters donated and an "estimated lives saved" counter.
* **Educational FAQ**: Provides an interactive section with essential information on requirements, preparation, and the donation process.

---

## 🛠️ Tech Stack

* **Language**: TypeScript
* **Frontend**: React.js (Functional Components, Hooks)
* **Styling**: Tailwind CSS (Mobile-first, responsive design)
* **Build Tool**: Vite
* **Testing**: Vitest (Unit testing)
* **Icons**: Lucide React
  
---
## 🚦 Running the Project (Locally)

1.  Clone the repository:
    ```bash
    git clone https://github.com/JuncProgramming/kalendarz-krwiodawcy.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd kalendarz-krwiodawcy
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
5.  Open [http://localhost:5173](http://localhost:5173) (or the port specified by Vite) in your browser.

### Testing

To verify the logic behind donation intervals and tax calculations, run the test suite:
```bash
npm run test
```

---

## 🎓 What I Learned / Project Challenges

* **TypeScript Type Safety**: Learned to implement comprehensive typing by defining all types in a centralized `types.ts` file, making the codebase more bulletproof and significantly reducing runtime errors.
* **Practical React Implementation**: This project solidified my understanding of functional components and core hooks (`useState`, `useEffect`) for managing application state. I also identified opportunities where advanced hooks like `useMemo` and `useCallback` could be applied to optimize performance.
* **Responsive UI with Tailwind CSS**: Polished my styling skills by implementing a modern, "mobile-first" design. Using Tailwind CSS allowed for a highly responsive and consistent interface, ensuring the app remains fully functional and visually appealing on devices of all sizes.
* **Navigation with TanStack Router**: Gained hands-on experience implementing type-safe routing using **TanStack Router**.
* **Testing with Vitest**: Utilized **Vitest** to ensure the tax relief and date calculators remain 100% accurate.
