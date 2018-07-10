export default function getMousePosition(element, event) {
  const box = element.getBoundingClientRect();
  return {
    x: event.clientX - box.left,
    y: event.clientY - box.top
  };
}