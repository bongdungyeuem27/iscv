export default function (elements, toggle, setToggle) {
  if (!elements || !toggle || !setToggle) return
  function handleClickOutside(event) {
    var yes = true
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].contains(event.target)) yes = false
    }
    if (yes) setToggle(!toggle)
  }

  document.addEventListener('mousedown', handleClickOutside)

  return () => {
    document.removeEventListener('mousedown', handleClickOutside)
  }
}

