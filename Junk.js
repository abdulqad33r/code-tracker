if (isScrollingDown) {
  for (let i = 0; i < elementIndex; i++) setStylesToCharacter(i, 1, 1)

  if (elementIndex === lastElementIndex)
    setStylesToCharacter(elementIndex, opacity.end, scale.end)
  else
    setStylesToCharacter(
      elementIndex,
      delta,
      lerp(scale.start, scale.end, delta)
    )
} else {
  for (let i = lastElementIndex; i > elementIndex; i--)
    setStylesToCharacter(i, opacity.start, scale.start)

  if (elementIndex === 0)
    setStylesToCharacter(elementIndex, opacity.start, scale.start)
  else
    setStylesToCharacter(
      elementIndex,
      lerp(opacity.end, opacity.start, Math.abs(delta - 1)),
      lerp(scale.end, scale.start, Math.abs(delta - 1))
    )
}
