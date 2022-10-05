"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfService = void 0;
const moment_1 = __importDefault(require("moment"));
const pdfmake_1 = __importDefault(require("pdfmake"));
class PdfService {
    createPdf(data) {
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
        const pdf = new pdfmake_1.default(fonts);
        const body = [];
        data.studentExpiration.map((student) => {
            const rows = new Array();
            rows.push(student.name);
            rows.push(`${student.current_month_plan} - ${student.plan.amount_installments}`);
            rows.push(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(student.plan.value.toFixed(2))));
            rows.push(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(Number(student.total_percent_rate).toFixed(2))));
            rows.push(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(student.calc_amount_receivable.toFixed(2))));
            body.push(rows);
        });
        const docDefinitions = {
            defaultStyle: { font: 'Helvetica' },
            content: [
                {
                    columns: [
                        { image: 'tmp/cintia_logo.png', width: 100, alignment: "left", },
                        { text: (0, moment_1.default)().format('LL'), alignment: "right", margin: [0, 50, 0, 0] },
                    ],
                },
                { text: `Valor a Total: ${data.sum_value}`, lineHeight: 2 },
                { text: `Valor a Descontar: ${data.sum_percent_rate}`, lineHeight: 2 },
                { text: `Valor a Receber : ${data.sum_amount_receivable} \n\n`, lineHeight: 2 },
                {
                    layout: 'noBorders',
                    table: {
                        widths: ['*', 100, 'auto', '*', '*'],
                        heights: function () {
                            return 20;
                        },
                        body: [
                            [{ text: 'Nome', style: 'columnsTitle' }, { text: 'Plano', style: 'columnsTitle' }, { text: 'Valor do Plano', style: 'columnsTitle' }, { text: 'Comissão', style: 'columnsTitle' }, { text: 'Receber', style: 'columnsTitle' },],
                            ...body
                        ]
                    }
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true
                },
                columnsTitle: {
                    bold: true
                }
            }
        };
        const pdfDoc = pdf.createPdfKitDocument(docDefinitions);
        pdfDoc.end();
    }
}
exports.PdfService = PdfService;
//# sourceMappingURL=CreatePdfService.js.map