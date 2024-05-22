(function() {
  const javascriptGenerator = Clamp.javascriptGenerator;
  ClampLoader.register(new (class extension {
    getInfo() {
      return {
        id: '0znzwInlineBlocks',
        name: 'Inline Blocks',
        blocks: [{
          opcode: 'inline',
          text: 'inline [branch]',
          arguments: {
            branch: {
              type: ClampLoader.ArgumentType.BRANCH,
            }
          },
          blockType: ClampLoader.BlockType.INLINE,
        }, {
          opcode: 'return',
          text: 'return [value]',
          arguments: {
            value: {
              type: ClampLoader.ArgumentType.ANY,
            }
          },
          terminal: true,
          blockType: ClampLoader.BlockType.COMMAND,
        }]
      }
    }
    inline(block) {
      const BLOCKS = javascriptGenerator.statementToCode(block, 'branch');
      const code = `(function(){\n${BLOCKS}\n})()`
      return [`${code}\n`, javascriptGenerator.ORDER_NONE];
    }
    return(block) {
      const RETURN = javascriptGenerator.valueToCode(block, 'value', javascriptGenerator.ORDER_ATOMIC);
      return `try {\nreturn(${RETURN});\n}catch{};\n`
    }
  }));
})();
