import { useState, useEffect } from "react";
import { Action, ActionPanel, Form } from "@raycast/api";

export default function Command() {
  const [inputText, setInputText] = useState<string>("");
  const [decodedText, setDecodedText] = useState<string>("");

  useEffect(() => {
    try {
      if (inputText) {
        setDecodedText(decodeURIComponent(inputText));
      } else {
        setDecodedText("");
      }
    } catch (error) {
      console.error("Error decoding URL:", error);
      setDecodedText("Error decoding text");
    }
  }, [inputText]);

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.CopyToClipboard
            title="Copy Decoded Result"
            content={decodedText}
            shortcut={{ modifiers: ["ctrl"], key: "enter" }}
          />
        </ActionPanel>
      }
    >
      <Form.TextArea
        id="inputText"
        title="Text to Decode"
        placeholder="Enter text to URL decode"
        value={inputText}
        onChange={setInputText}
      />
      <Form.Description title="Decoded Result" text={decodedText || "Enter text above to see decoded result"} />
      <Form.Description text="" />
    </Form>
  );
}
