import { useState } from 'react';
import styles from './App.module.css';
import powerImage from './assets/powered.png'
import { Griditem } from './components/GridItem';
import leftArrowImage from './assets/leftarrow.png'

import { levels, calculateIMC, Level } from './helpers/imc';

const App = () => {
  const [heightField, setHeightField] = useState<number>(0) // Usestate onde irá armazenar as infos do value
  const [weightField, setWeightField] = useState<number>(0)
  const [showItem, setShowItem] = useState<Level | null>(null); // Isso daqui é para pegar o Level do helpers

  const handleCalculateButton = () => {
      if(heightField && weightField) {
          setShowItem(calculateIMC(heightField, weightField))
      } else {
        alert("Digite todos os campos")
      }
  }

  const handleBackButton = () => { // botão para zerar o 'showItem'
    setShowItem (null);
    setHeightField(0);
    setWeightField(0);
  }
  
  return (
  <div className={styles.main}>
      <header>
      <div className={styles.headerContainer}>
        <img src={powerImage} width={150} />
      </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
        <h1>Calcule o seu IMC</h1>
        <p>O IMC é um índice que mede se você está abaixo, dentro ou acima do peso, de acordo com a relação entre seu peso e altura.</p>
       
      <input type="number"
        placeholder="Digite a sua altura. Ex: 1.7 (em metros)"
        value={heightField > 0 ? heightField : ''}
        onChange={e => setHeightField(parseFloat(e.target.value))} 
        disabled={!!(showItem)} />

      <input type="number"
        placeholder="Digite o seu peso. Ex: 55.4 (em kg)"
        value={weightField > 0 ? weightField : ''} 
        onChange={e => setWeightField(parseFloat(e.target.value))} // disabled={!!(showItem)} é um operador utilizado para converter o valor em boolean verdadeiro, assim evitando de fazer a condicional, após inserir os valores no input e retornar os resultados, os campos e o botão ficaram bloqueados
        disabled={!!(showItem)}/>
      

      <button onClick={handleCalculateButton} disabled={!!(showItem)}>Calcular </button>
       
      </div>
      
        
      <div className={styles.rightSide}>
        {!showItem && // quando não tiver 'showItem' irá exibir o grid
        <div className={styles.grid}>
        {levels.map((item, key)=>(
        <Griditem key = {key} item = {item}/>
      
      ))}
      </div>
        }

        {showItem && // quando tiver 'showItem' irá exibir apenas um item
          <div className={styles.rightBig}>
            <div className={styles.rightArrow} onClick={handleBackButton}>
             <img src={leftArrowImage} alt="" width={25}/>
            </div>
            <Griditem item={showItem}/>
          </div>
        }
      </div>
      </div>
  </div>
      
  )
}

export default App;