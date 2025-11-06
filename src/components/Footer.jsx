const Footer = ({ data }) => {
  return (
    <footer className="py-12 px-6 bg-neutral-900 dark:bg-neutral-950 text-neutral-300 dark:text-neutral-400">
      <div className="max-w-7xl mx-auto text-center">
        <p className="mb-2">
          © 2025 <span className="font-semibold text-neutral-100 dark:text-white">{data.name}</span> — Crafted with 💗 using React, Framer Motion & AI.
        </p>
        <p className="text-sm text-neutral-400 dark:text-neutral-500">All information is true to the best of my knowledge.</p>
      </div>
    </footer>
  )
}

export default Footer
