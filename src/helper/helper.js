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

export const appendToFormData = (formData, data) => {
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
};

export const getFromArray = (prop, array, id, src) => {
  const filter = array.filter((item) => item.id_po_item == id);
  console.log("this is filtered result", filter, src);
  if (filter.length > 0 && filter[0].hasOwnProperty(prop)) {
    return filter[0][prop];
  } else {
    return "N/A";
  }
};
