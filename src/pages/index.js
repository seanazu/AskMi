import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css';
import { HeaderText } from '@/styledComp/Headers';
import Form from '@/components/Form'

export default function Home() {


  return (
    <>
      <div className="mb-10 d-flex flex-column align-items-center" >
        <Head>
          <title>AskMi</title>
          <meta name='keywords' content='form for coding questions' />
        </Head>
        <Form />
      </div>
    </>
  )
}
