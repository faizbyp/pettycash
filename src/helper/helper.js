export const formatThousand = (value) => {
  return new Intl.NumberFormat("id-ID").format(value);
};

export const formatPercent = (percent) => `${(percent * 100).toFixed(0)}%`;

export const calculateTotal = (array, props) => {
  let sum = 0;
  array.forEach((item) => {
    sum += item[props] || 0;
  });
  return sum;
};

export const statusColor = (status) => {
  switch (status) {
    case "approved":
      return "success";
    case "rejected":
      return "error";
    case "pending":
      return "warning";
    default:
      return "default";
  }
};
