import { useState, useRef, useEffect } from 'react'
import { Tabs } from '@base-ui-components/react/tabs'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'
import { codeToHast } from 'shiki/bundle/web'
import { createCssVariablesTheme } from 'shiki/core'

import CopyButton from './CopyButton'

type Port = {
  name: string
  icon: string
  code: string
  lang: string
}

const marqyTheme = createCssVariablesTheme({
  name: 'css-variables',
  variablePrefix: '--astro-code-',
  variableDefaults: {},
  fontStyle: true,
})

async function highlight(code: string, lang: string): Promise<JSX.Element> {
  const out = await codeToHast(code, {
    lang,
    theme: marqyTheme,
  })

  return toJsxRuntime(out, {
    Fragment,
    jsx,
    jsxs,
  }) as JSX.Element
}

export default function QuickStartTabs({ ports }: { ports: Port[] }) {
  const [active, setActive] = useState(ports[0]?.name ?? '')
  const [highlighted, setHighlighted] = useState<Record<string, JSX.Element>>(
    {},
  )

  useEffect(() => {
    Promise.all(
      ports.map(async (port) => ({
        name: port.name,
        element: await highlight(port.code, port.lang),
      })),
    ).then((results) => {
      setHighlighted(
        Object.fromEntries(results.map((r) => [r.name, r.element])),
      )
    })
  }, [])

  const activePort = ports.find((p) => p.name === active)

  return (
    <div>
      <div className="flex justify-between mb-10 items-center bg-white text-black p-10 h-40 rounded-5">
        <p className="text-h3 uppercase">Usage</p>
      </div>

      <Tabs.Root
        value={active}
        onValueChange={(value) => setActive(value as string)}
        className="grid gap-10"
      >
        <Tabs.List className="grid grid-cols-4 gap-10">
          {ports.map((port) => (
            <Tabs.Tab
              key={port.name}
              value={port.name}
              className="grow flex items-center justify-center gap-x-5 clean-btn rounded-3 bg-white/10 data-active:animate-flicker-opacity hover:bg-white/20 cursor-pointer px-10 py-5 text-p0 uppercase data-active:text-white data-active:bg-purple transition-colors"
            >
              {port.icon && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  focusable="false"
                  aria-hidden="true"
                  className="size-30 shrink-0 fill-current"
                >
                  <use href={`#${port.icon}`}></use>
                </svg>
              )}
              <span className="sr-only">{port.name}</span>
            </Tabs.Tab>
          ))}
        </Tabs.List>
        <div className="relative overflow-hidden">
          {ports.map((port) => (
            <Tabs.Panel key={port.name} value={port.name} keepMounted>
              <div className="overflow-hidden w-full">
                {highlighted[port.name] ?? (
                  <pre>
                    <code>{port.code}</code>
                  </pre>
                )}
              </div>
            </Tabs.Panel>
          ))}
          {activePort && <CopyButton text={activePort.code} />}
        </div>
      </Tabs.Root>
    </div>
  )
}
