// import React, { useState, useEffect } from "react";
// import Quill from "quill/core";
// import "quill/dist/quill.snow.css";
// import ReactQuill from "react-quill/dist/react-quill";

// const CustomQuill = (props) => {
//   const [quill, setQuill] = useState(null);

//   useEffect(() => {
//     if (quill) {
//       quill.getModule("toolbar").addHandler("image", () => {
//         const input = document.createElement("input");
//         input.setAttribute("type", "file");
//         input.setAttribute("accept", "image/*");
//         input.click();
//         input.onchange = () => {
//           const file = input.files[0];
//           const range = quill.getSelection(true);
//           const index = range.index + range.length;
//           quill.insertEmbed(index, "image", { uploading: true });
//           const [image] = quill.getLeaf(index);
//           const img = new Image();
//           img.onload = () => {
//             const imgNode = quill.getLeaf(index)[0];
//             imgNode.domNode.src = URL.createObjectURL(file);
//             imgNode.domNode.removeAttribute("data-uploading");
//             quill.update(Quill.sources.USER);
//             quill.setSelection(index + 1, Quill.sources.SILENT);
//           };
//           img.src = URL.createObjectURL(file);
//         };
//       });
//     }
//   }, [quill]);

//   const insertImage = (imageUrl) => {
//     const range = quill.getSelection();
//     const index = range ? range.index : 0;
//     quill.insertEmbed(index, "image", { src: imageUrl });
//     quill.setSelection(index + 1);
//   };

//   const handleQuillMount = (quillInstance) => {
//     setQuill(quillInstance);
//   };

//   return (
//     <ReactQuill
//       {...props}
//       ref={handleQuillMount}
//       modules={{
//         toolbar: {
//           container: [
//             [{ header: [1, 2, false] }],
//             ["bold", "italic", "underline", "strike"],
//             ["link"],
//             ["image"],
//             [{ list: "ordered" }, { list: "bullet" }],
//             [{ indent: "-1" }, { indent: "+1" }],
//             ["clean"],
//           ],
//         },
//         imageResize: {},
//       }}
//       formats={[
//         "header",
//         "bold",
//         "italic",
//         "underline",
//         "strike",
//         "link",
//         "image",
//         "list",
//         "bullet",
//         "indent",
//       ]}
//     />
//   );
// };

// export default CustomQuill;
