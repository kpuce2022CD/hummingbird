export const onImageDownload = (id: string) => {
  const svg = document.getElementById(id);
  const svgData = new XMLSerializer().serializeToString(svg!);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx!.drawImage(img, 0, 0);
    const pngFile = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    // 파일명
    downloadLink.download = `QRCode${id}`;
    downloadLink.href = `${pngFile}`;
    downloadLink.click();
  };
  img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
};
