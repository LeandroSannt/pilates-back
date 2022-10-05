import Application from '@ioc:Adonis/Core/Application';
import { DataFinancialReportProps } from 'App/interfaces';
import fs from 'fs';
import moment from 'moment';
import PDFPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

export class PdfService{

  createPdf(data:DataFinancialReportProps,response:any,callback:any)  {
    var fonts = {
      Courier: {
        normal: 'Courier',
        bold: 'Courier-Bold',
        italics: 'Courier-Oblique',
        bolditalics: 'Courier-BoldOblique'
      },
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
      },
      Times: {
        normal: 'Times-Roman',
        bold: 'Times-Bold',
        italics: 'Times-Italic',
        bolditalics: 'Times-BoldItalic'
      },
      Symbol: {
        normal: 'Symbol'
      },
      ZapfDingbats: {
        normal: 'ZapfDingbats'
      }
    };

    const pdf = new PDFPrinter(fonts)

    const body:any = []

    data.studentExpiration.map((student) =>{
      const rows = new Array()
      rows.push(student.name)
      rows.push(`${student.current_month_plan} - ${student.plan.amount_installments}`)
      rows.push(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(student.plan.value.toFixed(2))))
      rows.push(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(Number(student.total_percent_rate).toFixed(2))) )
      rows.push(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(student.calc_amount_receivable.toFixed(2))) )

      body.push(rows)
    })

    const docDefinitions:TDocumentDefinitions ={
      defaultStyle:{font:'Helvetica'},
        content:[
          {
            columns:[
              {image:'tmp/cintia_logo.png',width:100, alignment:"left",},
              {text:moment().format('LL'), alignment:"right",margin:[0,50,0,0]},
            ],
          },
          {text:`Valor a Total: ${data.sum_value}`,lineHeight:2},
          {text:`Valor a Descontar: ${data.sum_percent_rate}`,lineHeight:2},
          {text:`Valor a Receber : ${data.sum_amount_receivable} \n\n`,lineHeight:2},
          {
            layout:'noBorders',
            table:{

              widths:[ '*', 100, 'auto', '*', '*' ],
              heights: function(){
                return 20
              },
            body:[
              [{text:'Nome',style:'columnsTitle'},{text:'Plano',style:'columnsTitle'},{text:'Valor do Plano',style:'columnsTitle'}, {text:'Comissão',style:'columnsTitle'}, {text:'Receber',style:'columnsTitle'},],
              ...body
            ]
          }
        }
       ],

       styles:{
        header:{
          fontSize:18,
          bold:true
        },
        columnsTitle:{
          bold:true
        }
       }
    }

    const chuncks:any = []

    const pdfDoc = pdf.createPdfKitDocument(docDefinitions)

    const filePath = Application.tmpPath(`reports/${moment().format('DDMMYYYYhhmm')}-report.pdf`)

    const c = pdfDoc.pipe(fs.createWriteStream(filePath))

    // pdfDoc.on('data',(chunk) =>{
    //   chuncks.push(chunk)
    // })



    // pdfDoc.on('end', () =>{
    //   const result = Buffer.concat(chuncks)

    //   response.header('Content-type', 'application/pdf')

    //   response.send(result.toString('base64'))

    //   return response.send(result)
    // })

    pdfDoc.end()

    // return c.path


  }

  // createPdfBinary(request:any, function (binary) {
	// 	res.contentType('application/pdf');
	// 	res.send(binary);
	// }, function (error) {
	// 	res.send('ERROR:' + error);
	// });

}








