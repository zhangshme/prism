import React, { useState } from 'react'
import styles from './Text.module.less'

const Text = ({ className, style, onClick, children }) => {
  const [editing, setEditing] = useState(false)

  return (
    <p
      className={`${styles.text} ${className}`}
      style={style}
      contentEditable={editing}
      onClick={onClick}
      onDoubleClick={() => setEditing(true)}
      onBlur={() => setEditing(false)}
    >
      {children}
    </p>
  )
}

export default Text