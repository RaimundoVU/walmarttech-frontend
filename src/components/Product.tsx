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
              console.log(values);
              const data = products.data;
              console.log(data);
              setProducts(data)
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
          <article key={product._id} onClick={() => open('https://' + product.image)}>
             <svg>
               <use xlinkHref={product.image} /> 
             </svg>
            <p>{[product.brand, product.description, product.price].join(
            ' - '
            )}</p>
          </article>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default ProductComponent;
