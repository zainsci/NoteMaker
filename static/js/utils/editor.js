import { makeBtn } from "../DOMs/button.js";
import svgItalic from "../SVGs/italic.js";
import svgBold from "../SVGs/bold.js";
import svgUnderline from "../SVGs/underline.js";
import svgStrikeThrough from "../SVGs/strikethrough.js";
import svgHeading from "../SVGs/heading.js";
import svgHorizontalRule from "../SVGs/horizontalRule.js";
import svgUnorderedList from "../SVGs/unorderedList.js";
import svgOrderedList from "../SVGs/orderedList.js";

// Text Editor
export default function makeEditor() {
  const fieldset = document.createElement("fieldset");

  const btnItalic = makeBtn();
  btnItalic.innerHTML = svgItalic;
  btnItalic.addEventListener("click", () => {
    document.execCommand("italic", false, null);
  });

  const btnBold = makeBtn();
  btnBold.innerHTML = svgBold;
  btnBold.addEventListener("click", () => {
    document.execCommand("bold", false, null);
  });

  const btnUnderline = makeBtn();
  btnUnderline.innerHTML = svgUnderline;
  btnUnderline.addEventListener("click", () => {
    document.execCommand("underline", false, null);
  });

  const btnStrikeThrough = makeBtn();
  btnStrikeThrough.innerHTML = svgStrikeThrough;
  btnStrikeThrough.addEventListener("click", () => {
    document.execCommand("strikethrough", false, null);
  });

  const btnHeading = makeBtn();
  btnHeading.innerHTML = svgHeading;
  btnHeading.addEventListener("click", () => {
    document.execCommand("heading", false, "H3");
  });

  const btnHRule = makeBtn();
  btnHRule.innerHTML = svgHorizontalRule;
  btnHRule.addEventListener("click", () => {
    document.execCommand("insertHorizontalRule", false, null);
  });

  const btnUList = makeBtn();
  btnUList.innerHTML = svgUnorderedList;
  btnUList.addEventListener("click", () => {
    document.execCommand("insertUnorderedList", false, null);
  });

  const btnOlIst = makeBtn();
  btnOlIst.innerHTML = svgOrderedList;
  btnOlIst.addEventListener("click", () => {
    document.execCommand("insertOrderedList", false, null);
  });

  fieldset.appendChild(btnBold);
  fieldset.appendChild(btnItalic);
  fieldset.appendChild(btnUnderline);
  fieldset.appendChild(btnStrikeThrough);
  fieldset.appendChild(btnHeading);
  fieldset.appendChild(btnHRule);
  fieldset.appendChild(btnOlIst);
  fieldset.appendChild(btnUList);
  return fieldset;
}
