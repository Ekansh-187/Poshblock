import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";
import newRequest from "../utils/newRequest";
import { toast } from "react-toastify";
const Pay = ({ pay, setPay, cid }) => {
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(false);

  const getToken = async () => {
    try {
      const { data } = await newRequest.get("/contracts/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async () => {
    let date = new Date().toLocaleDateString("en-IN");

    try {
      setLoading(true);
      const { type, nonce } = await instance.requestPaymentMethod();
      const { data } = await newRequest.post(`/contracts/payment/${cid}`, {
        type,
        nonce,
        cid,
        date,
      });
      setLoading(false);
      setPay(false);
      toast.success("Upload successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getToken();
  });

  return (
    <>
      <Transition appear show={pay} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setPay(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment
                  </Dialog.Title>
                  <div className="mt-2">
                    {load ? (
                      <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: {
                            flow: "vault",
                          },
                        }}
                        onInstance={(instance) => {
                          setInstance(instance);
                        }}
                      />
                    ) : undefined}{" "}
                    {/* <div className="inline-flex align-center w-full"> */}
                    {load && (
                      <div className="flex flex-col space-y-2">
                        <button
                          // type="submit"
                          onClick={handlePayment}
                          disabled={loading || !instance}
                          className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Pay $10
                        </button>
                        <button
                          // type="submit"
                          onClick={() => {
                            setLoad(false);
                            setPay(false);
                          }}
                          className="bg-red-500 w-full hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                    {!load && (
                      <div className="flex flex-col space-y-2">
                        <button
                          // type="submit"
                          onClick={() => setLoad(true)}
                          className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Make payment?
                        </button>
                        <button
                          // type="submit"
                          onClick={() => {
                            setLoad(false);
                            setPay(false);
                          }}
                          className="bg-red-500 w-full hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default Pay;
