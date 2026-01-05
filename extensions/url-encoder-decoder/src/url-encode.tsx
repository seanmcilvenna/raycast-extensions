import { useState, useEffect } from "react";
import { Action, ActionPanel, Form } from "@raycast/api";

export default function Command() {
  const [inputText, setInputText] = useState<string>("");
  const [encodedText, setEncodedText] = useState<string>("");

  useEffect(() => {
    try {
      if (inputText) {
        setEncodedText(encodeURIComponent(inputText));
      } else {
        setEncodedText("");
      }
    } catch (error) {
      console.error("Error encoding URL:", error);
      setEncodedText("Error encoding text");
    }
  }, [inputText]);

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.CopyToClipboard
            title="Copy Encoded Result"
            content={encodedText}
            shortcut={{ modifiers: ["ctrl"], key: "enter" }}
          />
        </ActionPanel>
      }
    >
      <Form.TextArea
        id="inputText"
        title="Text to Encode"
        placeholder="Enter text to URL encode"
        value={inputText}
        onChange={setInputText}
      />
      <Form.Description title="Encoded Result" text={encodedText || "Enter text above to see encoded result"} />
      <Form.Description text="" />
    </Form>
  );
}
