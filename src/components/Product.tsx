import React, {useState} from "react";
import { Formik, Form, Field} from 'formik'
import { getProducts } from '../services/api';
import '../styles/product.css'


const ProductComponent: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const open = (url: string) => window.open(url, '_blank')

  return (
    <div className='site-header' >
      <header>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={ async values => {
              const products = await getProducts(values.search)
              const data = products.data;
              const transformedData = data.map((product) => {
                let image = 'https://' + product.image;
                let price = new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'}).format(Number(product.price));
                product.image = image;
                product.price = price;
                return ({...product})
              })
              setProducts(transformedData)
            }
          } 
        >
          <Form>
            <Field placeholder='¿Qué estás buscando?' name='search' />
          </Form>
        </Formik>
      </header>
      <div className='container'>
        <div className='center'>
          { products.map((product) => 
          <article key={product._id} onClick={() => open(product.image)}>
            <img src={product.image}/>

            <p><b>{product.brand}</b> {product.description}</p>
            <p><b>{product.price}</b></p>
          </article>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default ProductComponent;
