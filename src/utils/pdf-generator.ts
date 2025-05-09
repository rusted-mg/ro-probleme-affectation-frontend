import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import domtoimage from "dom-to-image";

export const generatePdf = async (optimization: string, optimalValue: number | undefined, solution: number[]) => {
    const doc = new jsPDF();

    const matrixTableElement = document.getElementById("matrix-table");
    if (matrixTableElement) {
        try {
            const imgData = await domtoimage.toPng(matrixTableElement);

            doc.setFontSize(20);
            doc.setTextColor(128);
            doc.text("Source", 105, 20, { align: "center" });

            doc.setDrawColor(128);
            doc.line(10, 25, 200, 25);

            doc.addImage(imgData, "PNG", 10, 30, 190, 0);
        } catch (error) {
            console.error("Erreur lors de la capture de l'image :", error);
        }
    }

    doc.addPage();

    doc.setFontSize(20);
    doc.setTextColor(128);
    doc.text("Solution", 105, 20, { align: "center" });

    doc.setDrawColor(128);
    doc.line(10, 25, 200, 25);

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Type d'optimization: ${optimization === "MIN" ? "minimisation" : "maximisation"}`, 15, 40);
    doc.text(`Valeur optimale: ${optimalValue}`, 15, 50);

    const tableData = solution.map((value, index) => [index + 1, value + 1]);
    autoTable(doc, {
        head: [["N°Poste", "N°Candidat"]],
        body: tableData,
        startY: 60,
        headStyles: { fontSize: 12, halign: "center" },
        bodyStyles: { fontSize: 12, cellPadding: { top: 4, bottom: 4 }, halign: "center" },
    });

    const dateTime = new Date().toISOString().replace(/[:.]/g, "-");
    doc.save(`resultat_${dateTime}.pdf`);
};