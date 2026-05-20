// src/components/ui/RetroGrid.tsx
export default function RetroGrid() {
  return (
    <div className="pointer-events-none absolute h-full w-full overflow-hidden opacity-50 [perspective:200px]">
      {/* El grid con perspectiva 3D rotada */}
      <div className="absolute inset-0 [transform:rotateX(35deg)]">
        <div 
          className="absolute [background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw] animate-[grid_15s_linear_infinite]"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(201, 169, 110, 0.25) 1px, transparent 0), linear-gradient(to bottom, rgba(201, 169, 110, 0.25) 1px, transparent 0)'
          }}
        />
      </div>
      {/* Máscara oscura para que se desvanezca elegantemente hacia el fondo */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent to-90%" />
    </div>
  );
}