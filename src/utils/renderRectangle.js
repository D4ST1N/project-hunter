export default function renderRectangle(ctx, rect, offset) {
  ctx.fillStyle = rect.color;
  ctx.fillRect(
    rect.position.x,
    rect.position.y,
    rect.size,
    rect.size,
  );

  if (rect.border) {
    ctx.strokeStyle = rect.border;

    ctx.strokeRect(
      rect.position.x,
      rect.position.y,
      rect.size,
      rect.size,
    );
  }
}