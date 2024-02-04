import { Box } from "@mui/material";

type PageControlProps = {
  selectedColor?: string;
  unSelectedColor?: string;
  selectedIndex?: number;
  pages: any;
};

export const PageControl = ({
  selectedColor,
  unSelectedColor,
  selectedIndex,
  pages,
}: PageControlProps) => {
  return (
    <div className="flex gap-1 items-center justify-center">
      {Array.from(new Array(pages)).map((item, index) =>
        index === selectedIndex ? (
          <Box
            className="bg-appgreenlight"
            key={index}
            sx={{ width: 14, height: 14, bgcolor: selectedColor, borderRadius: 14 / 9 }}
          />
        ) : (
          <Box
            key={index}
            sx={{ width: 8, height: 8, bgcolor: unSelectedColor, borderRadius: 8 / 2 }}
          />
        ),
      )}
    </div>
  );
};
