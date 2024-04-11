import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({
  gastos,
  presupuesto,
  setGastos,
  setPresupuesto,
  setIsValidPresupuesto,
}) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );
    const totalDisponible = presupuesto - totalGastado;
    setGastado(totalGastado);
    setDisponible(totalDisponible);
  }, [gastos]);

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "CUP",
    });
  };

  const handleResetApp = () => {
    const resultado = confirm("¿Deseas reiniciar la aplicación?");
    if (resultado) {
      setPresupuesto(0);
      setGastos([]);
      setIsValidPresupuesto(false);
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <CircularProgressbar
        value={((presupuesto - disponible) / presupuesto) * 100}
        styles={buildStyles({
          trailColor: "#f5f5f5",
          pathColor: gastado < presupuesto ? "#3B82F6" : "#d63a3a",
          pathTransitionDuration: 1.2,
          textColor: gastado < presupuesto ? "#3B82F6" : "#d63a3a",
          textSize: "26px",
        })}
        text={
          gastado != 0
            ? `${(((presupuesto - disponible) / presupuesto) * 100).toFixed(
                2
              )}% gastado`
            : "Nada gastado aún"
        }
      />

      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          {" "}
          Reiniciar App
        </button>
        <p>
          <span>Presupuesto: </span>
          {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 && "negativo"}`}>
          <span>Disponible: </span>
          {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span>
          {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
