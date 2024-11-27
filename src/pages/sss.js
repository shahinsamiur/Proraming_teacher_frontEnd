Letters.map((letter, index) =>{
return(
  <MovingComponent
  type="jelly"
  duration="1000ms"
  delay="index * 100ms"
  direction="alternate-reverse"
  timing="ease-in"
  iteration="infinite"
  fillMode="none">
  {letter}
</MovingComponent>
)

})
