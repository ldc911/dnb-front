/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({ data, handleChange, placeHolder }) {
  return (
    <Listbox value={placeHolder} onChange={handleChange}>
      {({ open }) => (
        <div className="mt-1 relative">
          <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-center cursor-default focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 sm:text-sm">
            <span className="block truncate">{placeHolder}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              {data.map((element) => (
                <Listbox.Option
                  key={element.id}
                  className={({ active }) =>
                    classNames(
                      active ? "text-white bg-red-700" : "text-gray-900",
                      "cursor-default select-none relative py-2 pl-8 pr-4"
                    )
                  }
                  value={element.id}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={classNames(
                          selected ? "font-semibold" : "font-normal",
                          "block truncate"
                        )}
                      >
                        {element.nickname}
                      </span>

                      {selected ? (
                        <span
                          className={classNames(
                            active ? "text-white" : "text-red-700",
                            "absolute inset-y-0 left-0 flex items-center pl-1.5"
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
