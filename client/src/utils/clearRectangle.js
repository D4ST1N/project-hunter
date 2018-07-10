export default function clearRectangle(ctx, rect) {
  ctx.clearRect(rect.pos.x, rect.pos.y, rect.size.width, rect.size.height);
}