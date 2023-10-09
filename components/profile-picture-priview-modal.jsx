"use client";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const ProfilePrivew = ({
  imagePre,
  handleUpload,
  setPreviewImage,
  loading,
}) => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50  backdrop-blur-lg  ">
        <Button
          size="icon"
          variant="outline"
          disabled={loading}
          className="absolute top-6 right-4"
          onClick={() => setPreviewImage(null)}
        >
          {" "}
          X{" "}
        </Button>
        <Card>
          <CardHeader className="space-y">
            <CardDescription className="font-semibold">
              <Image
                src={imagePre}
                height={180}
                width={240}
                alt="profile"
                className="mx-auto rounded-md"
              />
            </CardDescription>
            <div className="flex justify-end gap-4 w-full ">
              <Button
                type="button"
                variant="ghost"
                disabled={loading}
                onClick={() => setPreviewImage(null)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="outline"
                onClick={handleUpload}
                disabled={loading}
              >
                {/* Save {loading && <Loader2 className="animate-spin" />} */}
                {loading ? (
                  <Loader2 className="animate-spin text-sm" />
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </CardHeader>
        </Card>
      </div>
    </>
  );
};

export default ProfilePrivew;
