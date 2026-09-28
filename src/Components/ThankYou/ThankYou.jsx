import React from 'react'
import { motion } from 'framer-motion'

export default function ThankYou() {
  return (
    <motion.main
      className="container d-flex justify-content-center align-items-center text-center"
      style={{ minHeight: '60vh' }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <h1 className="text-main fw-bold">
        Thank You For Choosing us and hope we see you again
      </h1>
    </motion.main>
  )
}
