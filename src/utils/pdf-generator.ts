import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import domtoimage from "dom-to-image";

const addHeader = (doc: jsPDF, title: string) => {
    doc.setFontSize(20);
    doc.setTextColor(128);
    doc.text(title, 105, 20, { align: "center" });

    doc.setDrawColor(128);
    doc.line(10, 25, 200, 25);
};

const addLegend = (doc: jsPDF) => {
    doc.setFillColor("#f2f2f2");
    doc.rect(10, 255, 190, 35, "F");

    doc.setFontSize(12);

    doc.setFillColor(59, 130, 246);
    doc.circle(17.5, 262.5, 2.5, "F");
    doc.setTextColor(0);
    doc.text(" Postes", 22, 264);

    doc.setFillColor(139, 92, 246);
    doc.circle(17.5, 272.5, 2.5, "F");
    doc.text(" Candidats", 22, 274);

    doc.setFillColor(191, 219, 254);
    doc.circle(17.5, 282.5, 2.5, "F");
    doc.text(" Solutions", 22, 284);
};

const addMatrixImage = async (doc: jsPDF, elementId: string) => {
    const matrixTableElement = document.getElementById(elementId);
    if (matrixTableElement) {
        try {
            const imgData = await domtoimage.toPng(matrixTableElement);
            doc.addImage(imgData, "PNG", 10, 30, 190, 0);
        } catch (error) {
            console.error("Erreur lors de la capture de l'image :", error);
        }
    }
};

const addResolutionDetails = (doc: jsPDF, optimization: string, optimalValue: number | undefined, solution: number[]) => {
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`- Type d'optimisation: ${optimization === "MIN" ? "minimisation" : "maximisation"}`, 15, 40);
    doc.text(`- Valeur optimale calculée: ${optimalValue}`, 15, 50);
    doc.text(`- Correspondance:`, 15, 60);

    const tableData = solution.map((value, index) => [index + 1, value + 1]);
    autoTable(doc, {
        head: [["N°Poste", "N°Candidat"]],
        body: tableData,
        startY: 70,
        headStyles: { fontSize: 12, halign: "center" },
        bodyStyles: { fontSize: 12, cellPadding: { top: 4, bottom: 4 }, halign: "center" },
    });
};

export const generatePdf = async (optimization: string, optimalValue: number | undefined, solution: number[]) => {
    const doc = new jsPDF();

    addHeader(doc, "Source");
    await addMatrixImage(doc, "matrix-table");
    addLegend(doc);

    doc.addPage();
    addHeader(doc, "Résolution");
    addResolutionDetails(doc, optimization, optimalValue, solution);

    const dateTime = new Date().toISOString().replace(/[:.]/g, "-");
    doc.save(`resultat_${dateTime}.pdf`);
};